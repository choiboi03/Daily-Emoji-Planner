import { useEffect, useRef } from 'react'
import type { PlannerState } from '../types'
import { saveState } from '../utils/storage'

export function useAutoSave(state: PlannerState, delayMs: number = 300): void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveState(state);
    }, delayMs);

    return () => clearTimeout(timeoutRef.current);
  }, [state, delayMs]);
}
