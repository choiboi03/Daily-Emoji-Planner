import type { Task, DayData, DayPreview } from '../types'
import { MINUTES_PER_CELL } from '../types'

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const aScheduled = a.startCell !== null;
    const bScheduled = b.startCell !== null;

    if (aScheduled && !bScheduled) return -1;
    if (!aScheduled && bScheduled) return 1;

    if (aScheduled && bScheduled) {
      return a.startCell! - b.startCell!;
    }

    return a.createdAt - b.createdAt;
  });
}

export function getTaskDuration(task: Task): { hours: number; minutes: number } | null {
  if (task.startCell === null || task.endCell === null) return null;
  const totalMinutes = (task.endCell - task.startCell + 1) * MINUTES_PER_CELL;
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

export function getDayPreview(day: DayData | undefined): DayPreview {
  if (!day || day.tasks.length === 0) {
    return { emoji: null, color: null };
  }

  const cellCounts = new Map<string, number>();
  for (const cell of day.grid) {
    if (cell.taskId) {
      cellCounts.set(cell.taskId, (cellCounts.get(cell.taskId) || 0) + 1);
    }
  }

  if (cellCounts.size === 0) {
    const first = day.tasks[0];
    return { emoji: first.emoji, color: first.color };
  }

  let maxId = '';
  let maxCount = 0;
  for (const [id, count] of cellCounts) {
    if (count > maxCount) {
      maxCount = count;
      maxId = id;
    }
  }

  const task = day.tasks.find(t => t.id === maxId);
  if (!task) return { emoji: null, color: null };
  return { emoji: task.emoji, color: task.color };
}
