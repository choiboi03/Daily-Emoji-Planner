import { usePlanner } from '../../context/PlannerContext'
import { formatDisplayDate } from '../../utils/dateUtils'
import BackIcon from '../common/icons/BackIcon'
import ShareIcon from '../common/icons/ShareIcon'
import styles from './GridHeader.module.css'

interface GridHeaderProps {
  onShare: () => void;
}

export default function GridHeader({ onShare }: GridHeaderProps) {
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
      <button className={styles.shareBtn} onClick={onShare} aria-label="Share">
        <ShareIcon size={20} />
      </button>
    </div>
  );
}
