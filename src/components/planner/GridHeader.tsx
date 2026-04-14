import { usePlanner } from '../../context/PlannerContext'
import { formatDisplayDate } from '../../utils/dateUtils'
import BackIcon from '../common/icons/BackIcon'
import styles from './GridHeader.module.css'

export default function GridHeader() {
  const { selectedDate, setViewMode, cancelColoring } = usePlanner();

  const handleBack = () => {
    cancelColoring();
    setViewMode('calendar');
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button className={styles.backBtn} onClick={handleBack} aria-label="Back to calendar">
          <BackIcon size={18} />
        </button>
        <span className={styles.date}>
          {selectedDate ? formatDisplayDate(selectedDate) : ''}
        </span>
      </div>
    </div>
  );
}
