import { useRef, useCallback } from 'react'
import { usePlanner } from '../../context/PlannerContext'
import { exportAsImage } from '../../utils/exportImage'
import GridHeader from './GridHeader'
import TimeGrid from './TimeGrid'
import TaskPanel from './TaskPanel'
import styles from './DailyPlannerView.module.css'

export default function DailyPlannerView() {
  const { selectedDate } = usePlanner();
  const exportRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!exportRef.current || !selectedDate) return;
    try {
      await exportAsImage(exportRef.current, `planner-${selectedDate}.png`);
    } catch {
      // Export failed silently
    }
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <GridHeader onShare={handleShare} />
      <div className={styles.body} ref={exportRef}>
        <div className={styles.leftPanel}>
          <TimeGrid />
        </div>
        <div className={styles.rightPanel}>
          <TaskPanel />
        </div>
      </div>
    </div>
  );
}
