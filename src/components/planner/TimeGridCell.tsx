import type { Task, ColoringPhase } from '../../types'
import styles from './TimeGridCell.module.css'

interface TimeGridCellProps {
  cellIndex: number;
  task: Task | null;
  coloringState: ColoringPhase;
  onCellClick: (cellIndex: number) => void;
}

export default function TimeGridCell({ cellIndex, task, coloringState, onCellClick }: TimeGridCellProps) {
  const isFilled = task !== null;
  const isClickable = coloringState.phase === 'task-selected' || coloringState.phase === 'start-picked';

  const isHighlighted =
    coloringState.phase === 'start-picked' &&
    cellIndex === coloringState.startCell;

  return (
    <div
      className={`${styles.cell} ${isClickable ? styles.clickable : ''} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={() => onCellClick(cellIndex)}
    >
      <div
        className={`${styles.inner} ${!isFilled ? styles.empty : ''}`}
        style={isFilled ? { backgroundColor: task.color } : undefined}
      >
        {isFilled && task.emoji ? task.emoji : ''}
      </div>
    </div>
  );
}
