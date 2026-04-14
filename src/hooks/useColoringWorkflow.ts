import { useCallback } from 'react'
import type { ColoringPhase } from '../types'

interface UseColoringWorkflowReturn {
  selectTask: (taskId: string) => void;
  selectCell: (cellIndex: number) => void;
  cancel: () => void;
}

export function useColoringWorkflow(
  coloringState: ColoringPhase,
  setColoringState: (state: ColoringPhase) => void,
  onComplete: (taskId: string, startCell: number, endCell: number) => void,
): UseColoringWorkflowReturn {
  const selectTask = useCallback((taskId: string) => {
    if (coloringState.phase !== 'idle' && coloringState.taskId === taskId) {
      setColoringState({ phase: 'idle' });
    } else {
      setColoringState({ phase: 'task-selected', taskId });
    }
  }, [coloringState, setColoringState]);

  const selectCell = useCallback((cellIndex: number) => {
    if (coloringState.phase === 'task-selected') {
      setColoringState({
        phase: 'start-picked',
        taskId: coloringState.taskId,
        startCell: cellIndex,
      });
    } else if (coloringState.phase === 'start-picked') {
      const start = Math.min(coloringState.startCell, cellIndex);
      const end = Math.max(coloringState.startCell, cellIndex);
      onComplete(coloringState.taskId, start, end);
      setColoringState({ phase: 'idle' });
    }
  }, [coloringState, setColoringState, onComplete]);

  const cancel = useCallback(() => {
    setColoringState({ phase: 'idle' });
  }, [setColoringState]);

  return { selectTask, selectCell, cancel };
}
