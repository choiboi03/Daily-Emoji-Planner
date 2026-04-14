import GridHeader from './GridHeader'
import TimeGrid from './TimeGrid'
import TaskPanel from './TaskPanel'
import styles from './DailyPlannerView.module.css'

export default function DailyPlannerView() {
  return (
    <div className={styles.container}>
      <GridHeader />
      <div className={styles.body}>
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
