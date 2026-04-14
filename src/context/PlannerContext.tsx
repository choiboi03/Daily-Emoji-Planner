import { createContext, useContext, useReducer, useCallback, useState, useRef, type ReactNode } from 'react'
import type { PlannerState, DayData, Task, ColoringPhase, ViewMode } from '../types'
import { createEmptyDay } from '../types'
import { useAutoSave } from '../hooks/useAutoSave'
import { useColoringWorkflow } from '../hooks/useColoringWorkflow'
import { loadState, getInitialState } from '../utils/storage'

type Action =
  | { type: 'ADD_TASK'; date: string; task: Task }
  | { type: 'UPDATE_TASK'; date: string; taskId: string; updates: Partial<Pick<Task, 'emoji' | 'color' | 'content'>> }
  | { type: 'DELETE_TASK'; date: string; taskId: string }
  | { type: 'FILL_GRID'; date: string; taskId: string; startCell: number; endCell: number }
  | { type: 'CLEAR_TASK_CELLS'; date: string; taskId: string }
  | { type: 'UPDATE_SETTINGS'; settings: PlannerState['settings'] }
  | { type: 'HYDRATE'; state: PlannerState };

function ensureDay(state: PlannerState, date: string): DayData {
  return state.days[date] || createEmptyDay(date);
}

function reducer(state: PlannerState, action: Action): PlannerState {
  switch (action.type) {
    case 'ADD_TASK': {
      const day = ensureDay(state, action.date);
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: {
            ...day,
            tasks: [...day.tasks, action.task],
          },
        },
      };
    }
    case 'UPDATE_TASK': {
      const day = state.days[action.date];
      if (!day) return state;
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: {
            ...day,
            tasks: day.tasks.map(t =>
              t.id === action.taskId ? { ...t, ...action.updates } : t
            ),
          },
        },
      };
    }
    case 'DELETE_TASK': {
      const day = state.days[action.date];
      if (!day) return state;
      const newGrid = day.grid.map(cell =>
        cell.taskId === action.taskId ? { taskId: null } : cell
      );
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: {
            ...day,
            tasks: day.tasks.filter(t => t.id !== action.taskId),
            grid: newGrid,
          },
        },
      };
    }
    case 'FILL_GRID': {
      const day = ensureDay(state, action.date);
      const newGrid = [...day.grid.map(c => ({ ...c }))];
      // Clear old cells for this task
      for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i].taskId === action.taskId) {
          newGrid[i] = { taskId: null };
        }
      }
      // Fill new range
      for (let i = action.startCell; i <= action.endCell; i++) {
        newGrid[i] = { taskId: action.taskId };
      }
      const newTasks = day.tasks.map(t =>
        t.id === action.taskId
          ? { ...t, startCell: action.startCell, endCell: action.endCell }
          : t
      );
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: {
            ...day,
            tasks: newTasks,
            grid: newGrid,
          },
        },
      };
    }
    case 'CLEAR_TASK_CELLS': {
      const day = state.days[action.date];
      if (!day) return state;
      const newGrid = day.grid.map(cell =>
        cell.taskId === action.taskId ? { taskId: null } : cell
      );
      const newTasks = day.tasks.map(t =>
        t.id === action.taskId ? { ...t, startCell: null, endCell: null } : t
      );
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: { ...day, tasks: newTasks, grid: newGrid },
        },
      };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.settings };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

interface PlannerContextValue {
  state: PlannerState;
  dispatch: React.Dispatch<Action>;
  // View state
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  currentMonth: { year: number; month: number };
  setCurrentMonth: (m: { year: number; month: number }) => void;
  // Coloring workflow
  coloringState: ColoringPhase;
  selectTask: (taskId: string) => void;
  selectCell: (cellIndex: number) => void;
  cancelColoring: () => void;
}

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used within PlannerProvider');
  return ctx;
}

const VIEW_KEY = 'daily-emoji-planner-view';

function loadView(): { viewMode: ViewMode; selectedDate: string | null } {
  try {
    const raw = sessionStorage.getItem(VIEW_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { viewMode: 'calendar', selectedDate: null };
}

function saveView(viewMode: ViewMode, selectedDate: string | null) {
  try {
    sessionStorage.setItem(VIEW_KEY, JSON.stringify({ viewMode, selectedDate }));
  } catch { /* ignore */ }
}

export function PlannerProvider({ children }: { children: ReactNode }) {
  const initial = loadState() || getInitialState();
  const [state, dispatch] = useReducer(reducer, initial);

  const savedView = loadView();
  const now = new Date();
  const [viewMode, setViewModeRaw] = useState<ViewMode>(savedView.viewMode);
  const [selectedDate, setSelectedDateRaw] = useState<string | null>(savedView.selectedDate);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (savedView.selectedDate) {
      const [y, m] = savedView.selectedDate.split('-').map(Number);
      return { year: y, month: m - 1 };
    }
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [coloringState, setColoringState] = useState<ColoringPhase>({ phase: 'idle' });

  const viewRef = useRef(viewMode);
  const dateRef = useRef(selectedDate);

  const setViewMode = useCallback((mode: ViewMode) => {
    viewRef.current = mode;
    setViewModeRaw(mode);
    saveView(mode, mode === 'calendar' ? null : dateRef.current);
  }, []);

  const setSelectedDate = useCallback((date: string | null) => {
    dateRef.current = date;
    setSelectedDateRaw(date);
    saveView(date ? 'daily' : viewRef.current, date);
  }, []);

  useAutoSave(state);

  const onColoringComplete = useCallback((taskId: string, startCell: number, endCell: number) => {
    if (selectedDate) {
      dispatch({ type: 'FILL_GRID', date: selectedDate, taskId, startCell, endCell });
    }
  }, [selectedDate]);

  const { selectTask, selectCell, cancel: cancelColoring } = useColoringWorkflow(
    coloringState,
    setColoringState,
    onColoringComplete,
  );

  return (
    <PlannerContext.Provider value={{
      state, dispatch,
      viewMode, setViewMode,
      selectedDate, setSelectedDate,
      currentMonth, setCurrentMonth,
      coloringState, selectTask, selectCell, cancelColoring,
    }}>
      {children}
    </PlannerContext.Provider>
  );
}
