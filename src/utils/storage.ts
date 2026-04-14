import type { PlannerState } from '../types'
import { STORAGE_KEY } from '../constants'

const CURRENT_VERSION = 1;

export function loadState(): PlannerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlannerState;
    if (parsed && typeof parsed.version === 'number') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveState(state: PlannerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function getInitialState(): PlannerState {
  return {
    days: {},
    settings: { theme: 'light' },
    version: CURRENT_VERSION,
  };
}

export function exportBackup(state: PlannerState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `emoji-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBackup(file: File): Promise<PlannerState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as PlannerState;
        if (data && typeof data.version === 'number' && data.days) {
          resolve(data);
        } else {
          reject(new Error('Invalid backup file'));
        }
      } catch {
        reject(new Error('Failed to parse backup file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
