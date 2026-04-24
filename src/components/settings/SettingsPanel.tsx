import { useRef } from 'react'
import { useSettings } from '../../context/SettingsContext'
import { usePlanner } from '../../context/PlannerContext'
import { exportBackup, importBackup } from '../../utils/storage'
import styles from './SettingsPanel.module.css'

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, toggleTheme, setLanguage, t } = useSettings();
  const { state, dispatch } = usePlanner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackup = () => {
    exportBackup(state);
  };

  const handleRestore = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importBackup(file);
      dispatch({ type: 'HYDRATE', state: data });
      if (data.settings?.theme) {
        document.documentElement.setAttribute('data-theme', data.settings.theme);
      }
    } catch {
      alert(t.invalidBackup);
    }
    e.target.value = '';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.panel}>
        <div className={styles.title}>{t.settings}</div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.appearance}</div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.darkMode}</span>
            <div
              className={`${styles.toggle} ${settings.theme === 'dark' ? styles.active : ''}`}
              onClick={toggleTheme}
            >
              <div className={styles.toggleKnob} />
            </div>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.language}</span>
            <div className={styles.segmented} role="group" aria-label={t.language}>
              <button
                type="button"
                className={`${styles.segment} ${settings.language === 'en' ? styles.segmentActive : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`${styles.segment} ${settings.language === 'ko' ? styles.segmentActive : ''}`}
                onClick={() => setLanguage('ko')}
              >
                한글
              </button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.data}</div>
          <div className={styles.btnRow}>
            <button className={styles.btn} onClick={handleBackup}>{t.backup}</button>
            <button className={styles.btn} onClick={handleRestore}>{t.restore}</button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        <button className={styles.closeBtn} onClick={onClose}>{t.close}</button>
      </div>
    </div>
  );
}
