import { useSettings } from '../../context/SettingsContext'
import styles from './SettingsPanel.module.css'

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, toggleTheme, setLanguage, t } = useSettings();

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

        <button className={styles.closeBtn} onClick={onClose}>{t.close}</button>
      </div>
    </div>
  );
}
