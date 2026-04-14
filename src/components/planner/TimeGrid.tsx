import { usePlanner } from '../../context/PlannerContext'
import { GRID_ROWS, GRID_COLS } from '../../types'
import type { Task } from '../../types'
import TimeGridCell from './TimeGridCell'
import styles from './TimeGrid.module.css'

export default function TimeGrid() {
  const { state, selectedDate, coloringState, selectCell } = usePlanner();
  const day = selectedDate ? state.days[selectedDate] : undefined;

  const taskMap = new Map<string, Task>();
  if (day) {
    for (const task of day.tasks) {
      taskMap.set(task.id, task);
    }
  }

  const handleCellClick = (cellIndex: number) => {
    if (coloringState.phase === 'task-selected' || coloringState.phase === 'start-picked') {
      selectCell(cellIndex);
    }
  };

  const rows = [];
  for (let hour = 0; hour < GRID_ROWS; hour++) {
    const cells = [];
    for (let col = 0; col < GRID_COLS; col++) {
      const cellIndex = hour * GRID_COLS + col;
      const gridCell = day?.grid[cellIndex];
      const task = gridCell?.taskId ? taskMap.get(gridCell.taskId) || null : null;
      cells.push(
        <TimeGridCell
          key={cellIndex}
          cellIndex={cellIndex}
          task={task}
          coloringState={coloringState}
          onCellClick={handleCellClick}
        />
      );
    }
    rows.push(
      <div key={hour} className={styles.row}>
        <div className={styles.hourLabel}>{String(hour).padStart(2, '0')}</div>
        <div className={styles.cells}>{cells}</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {rows}
      </div>
    </div>
  );
}
