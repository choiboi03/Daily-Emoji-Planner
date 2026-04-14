import { usePlanner } from '../../context/PlannerContext'
import { formatDateKey } from '../../utils/dateUtils'
import { getDayPreview } from '../../utils/taskUtils'
import RoundedBox from '../common/RoundedBox'
import styles from './DayCell.module.css'

interface DayCellProps {
  day: number | null;
  dayOfWeek: number;
}

export default function DayCell({ day, dayOfWeek }: DayCellProps) {
  const { state, currentMonth, setSelectedDate, setViewMode } = usePlanner();

  if (day === null) {
    return <div className={`${styles.cell} ${styles.empty}`} />;
  }

  const dateKey = formatDateKey(new Date(currentMonth.year, currentMonth.month, day));
  const preview = getDayPreview(state.days[dateKey]);

  const now = new Date();
  const isToday =
    now.getFullYear() === currentMonth.year &&
    now.getMonth() === currentMonth.month &&
    now.getDate() === day;

  const handleClick = () => {
    setSelectedDate(dateKey);
    setViewMode('daily');
  };

  const dateClass = [
    styles.dateNum,
    isToday ? styles.today : '',
    dayOfWeek === 0 ? styles.sunday : '',
    dayOfWeek === 6 ? styles.saturday : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.cell} onClick={handleClick}>
      <span className={dateClass}>{day}</span>
      <RoundedBox color={preview.color} emoji={preview.emoji} size="calendarPreview" />
    </div>
  );
}
