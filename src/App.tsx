import { useCallback, useEffect } from 'react'
import { PlannerProvider, usePlanner } from './context/PlannerContext'
import { SettingsProvider } from './context/SettingsContext'
import type { AppSettings } from './types'
import CalendarView from './components/calendar/CalendarView'
import DailyPlannerView from './components/planner/DailyPlannerView'

function AppContent() {
  const { state, dispatch, viewMode } = usePlanner();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
  }, [state.settings.theme]);

  const handleSettingsUpdate = useCallback((settings: AppSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
  }, [dispatch]);

  return (
    <SettingsProvider settings={state.settings} onUpdate={handleSettingsUpdate}>
      <div style={{ height: '100%', width: '100%' }}>
        {viewMode === 'calendar' ? <CalendarView /> : <DailyPlannerView />}
      </div>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <PlannerProvider>
      <AppContent />
    </PlannerProvider>
  );
}
