import { createContext, useContext, useCallback, useMemo, type ReactNode } from 'react'
import type { AppSettings, Language } from '../types'
import { translations, type Translations } from '../i18n/translations'

interface SettingsContextValue {
  settings: AppSettings;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export function useTranslation(): Translations {
  return useSettings().t;
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

  const toggleLanguage = useCallback(() => {
    const next: Language = settings.language === 'en' ? 'ko' : 'en';
    onUpdate({ ...settings, language: next });
  }, [settings, onUpdate]);

  const setLanguage = useCallback((language: Language) => {
    onUpdate({ ...settings, language });
  }, [settings, onUpdate]);

  const t = useMemo(() => translations[settings.language] ?? translations.en, [settings.language]);

  return (
    <SettingsContext.Provider value={{ settings, toggleTheme, setTheme, toggleLanguage, setLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
}
