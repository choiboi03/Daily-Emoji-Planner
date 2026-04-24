import { usePlanner } from '../../context/PlannerContext'
import { useTranslation } from '../../context/SettingsContext'
import BackIcon from '../common/icons/BackIcon'
import styles from './GridHeader.module.css'

export default function GridHeader() {
  const { selectedDate, setViewMode, cancelColoring } = usePlanner();
  const t = useTranslation();

  const handleBack = () => {
    cancelColoring();
    setViewMode('calendar');
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button className={styles.backBtn} onClick={handleBack} aria-label={t.backToCalendar}>
          <BackIcon size={18} />
        </button>
        <span className={styles.date}>
          {selectedDate ? t.formatDisplayDate(selectedDate) : ''}
        </span>
      </div>
    </div>
  );
}
