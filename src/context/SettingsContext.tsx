import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { AppSettings } from '../types'

interface SettingsContextValue {
  settings: AppSettings;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

interface SettingsProviderProps {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
  children: ReactNode;
}

export function SettingsProvider({ settings, onUpdate, children }: SettingsProviderProps) {
  const toggleTheme = useCallback(() => {
    const next = settings.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    onUpdate({ ...settings, theme: next });
  }, [settings, onUpdate]);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
    onUpdate({ ...settings, theme });
  }, [settings, onUpdate]);

  return (
    <SettingsContext.Provider value={{ settings, toggleTheme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}
