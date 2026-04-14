export interface Task {
  id: string;
  emoji: string | null;
  color: string;
  content: string;
  startCell: number | null;
  endCell: number | null;
  createdAt: number;
}

export interface GridCell {
  taskId: string | null;
}

export interface DayData {
  date: string;
  tasks: Task[];
  grid: GridCell[];
}

export interface AppSettings {
  theme: 'light' | 'dark';
}

export interface PlannerState {
  days: Record<string, DayData>;
  settings: AppSettings;
  version: number;
}

export type ColoringPhase =
  | { phase: 'idle' }
  | { phase: 'task-selected'; taskId: string }
  | { phase: 'start-picked'; taskId: string; startCell: number };

export interface DayPreview {
  emoji: string | null;
  color: string | null;
}

export type ViewMode = 'calendar' | 'daily';

export const GRID_ROWS = 24;
export const GRID_COLS = 5;
export const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

export function cellToTime(cellIndex: number): string {
  const totalMinutes = cellIndex * 20;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function createEmptyGrid(): GridCell[] {
  return Array.from({ length: TOTAL_CELLS }, () => ({ taskId: null }));
}

export function createEmptyDay(date: string): DayData {
  return { date, tasks: [], grid: createEmptyGrid() };
}
