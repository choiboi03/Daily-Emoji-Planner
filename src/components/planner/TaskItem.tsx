import type { Task, ColoringPhase } from '../../types'
import { cellToTime } from '../../types'
import { getTaskDuration } from '../../utils/taskUtils'
import { i18n } from '../../constants'
import RoundedBox from '../common/RoundedBox'
import styles from './TaskItem.module.css'

interface TaskItemProps {
  task: Task;
  coloringState: ColoringPhase;
  onSelect: () => void;
}

export default function TaskItem({ task, coloringState, onSelect }: TaskItemProps) {
  const isActive =
    coloringState.phase !== 'idle' && coloringState.taskId === task.id;

  const duration = getTaskDuration(task);
  const hasTime = task.startCell !== null && task.endCell !== null;

  const timeRange = hasTime
    ? `${cellToTime(task.startCell!)}~${cellToTime(task.endCell! + 1)}`
    : '00:00~00:00';

  const durationText = duration
    ? `${duration.hours}hr ${duration.minutes}min`
    : '0hr 0min';

  let displayContent: React.ReactNode;
  if (isActive && coloringState.phase === 'task-selected') {
    displayContent = <span className={styles.instruction}>{i18n.selectStart}</span>;
  } else if (isActive && coloringState.phase === 'start-picked') {
    displayContent = <span className={styles.instruction}>{i18n.selectEnd}</span>;
  } else {
    displayContent = <span className={styles.content}>{task.content}</span>;
  }

  return (
    <div
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onSelect}
    >
      <div className={styles.boxWrap}>
        <RoundedBox color={task.color} emoji={task.emoji} size="large" />
      </div>
      <div className={styles.info}>
        {displayContent}
        <div className={styles.timeRow}>
          <span className={`${styles.timeRange} ${!hasTime ? styles.muted : ''}`}>
            {timeRange}
          </span>
          <span className={`${styles.duration} ${!hasTime ? styles.muted : ''}`}>
            {durationText}
          </span>
        </div>
      </div>
    </div>
  );
}
