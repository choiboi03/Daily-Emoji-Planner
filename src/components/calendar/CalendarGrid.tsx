import { usePlanner } from '../../context/PlannerContext'
import { useTranslation } from '../../context/SettingsContext'
import { getCalendarDays } from '../../utils/dateUtils'
import DayCell from './DayCell'
import styles from './CalendarGrid.module.css'

export default function CalendarGrid() {
  const { currentMonth } = usePlanner();
  const t = useTranslation();
  const days = getCalendarDays(currentMonth.year, currentMonth.month);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dayHeaders}>
        {t.daysOfWeek.map((d, i) => (
          <div key={i} className={styles.dayHeader}>{d}</div>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day, i) => (
          <DayCell key={i} day={day} dayOfWeek={i % 7} />
        ))}
      </div>
    </div>
  );
}
