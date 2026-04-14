import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import SettingsPanel from '../settings/SettingsPanel'
import styles from './CalendarView.module.css'

export default function CalendarView() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles.container}>
      <CalendarHeader onOpenSettings={() => setShowSettings(true)} />
      <CalendarGrid />
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
