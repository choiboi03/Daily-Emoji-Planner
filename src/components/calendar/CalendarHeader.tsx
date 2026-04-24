import { usePlanner } from '../../context/PlannerContext'
import { useTranslation } from '../../context/SettingsContext'
import { navigateMonth } from '../../utils/dateUtils'
import ChevronLeftIcon from '../common/icons/ChevronLeftIcon'
import ChevronRightIcon from '../common/icons/ChevronRightIcon'
import GearIcon from '../common/icons/GearIcon'
import styles from './CalendarHeader.module.css'

interface CalendarHeaderProps {
  onOpenSettings: () => void;
}

export default function CalendarHeader({ onOpenSettings }: CalendarHeaderProps) {
  const { currentMonth, setCurrentMonth } = usePlanner();
  const t = useTranslation();

  const goToPrevMonth = () => {
    setCurrentMonth(navigateMonth(currentMonth.year, currentMonth.month, -1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(navigateMonth(currentMonth.year, currentMonth.month, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() });
  };

  return (
    <div className={styles.header}>
      <div className={styles.monthNav}>
        <button className={styles.navBtn} onClick={goToPrevMonth} aria-label={t.prevMonth}>
          <ChevronLeftIcon size={18} />
        </button>
        <button className={styles.monthLabel} onClick={goToToday}>
          {t.formatMonthYear(currentMonth.year, currentMonth.month)}
        </button>
        <button className={styles.navBtn} onClick={goToNextMonth} aria-label={t.nextMonth}>
          <ChevronRightIcon size={18} />
        </button>
      </div>
      <button className={styles.settingsBtn} onClick={onOpenSettings} aria-label={t.openSettings}>
        <GearIcon size={20} />
      </button>
    </div>
  );
}
