import type { PlannerState } from '../types'
import { STORAGE_KEY } from '../constants'

const CURRENT_VERSION = 1;

export function loadState(): PlannerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlannerState;
    if (parsed && typeof parsed.version === 'number') {
      if (!parsed.settings.language) {
        parsed.settings.language = detectDefaultLanguage();
      }
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

function detectDefaultLanguage(): 'en' | 'ko' {
  try {
    const lang = navigator.language || '';
    return lang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  } catch {
    return 'en';
  }
}

export function getInitialState(): PlannerState {
  return {
    days: {},
    settings: { theme: 'light', language: detectDefaultLanguage() },
    version: CURRENT_VERSION,
  };
}
