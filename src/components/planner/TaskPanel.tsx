import { useState, useCallback } from 'react'
import { usePlanner } from '../../context/PlannerContext'
import { sortTasks } from '../../utils/taskUtils'
import { i18n } from '../../constants'
import type { Task } from '../../types'
import PlusIcon from '../common/icons/PlusIcon'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import styles from './TaskPanel.module.css'

export default function TaskPanel() {
  const { state, dispatch, selectedDate, coloringState, selectTask, cancelColoring } = usePlanner();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);

  const day = selectedDate ? state.days[selectedDate] : undefined;
  const tasks = day ? sortTasks(day.tasks) : [];

  const handleAddTask = useCallback((color: string, emoji: string | null, content: string) => {
    if (!selectedDate) return;
    const task: Task = {
      id: crypto.randomUUID(),
      emoji,
      color,
      content,
      startCell: null,
      endCell: null,
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_TASK', date: selectedDate, task });
    setShowForm(false);
  }, [selectedDate, dispatch]);

  const handleEditTask = useCallback((color: string, emoji: string | null, content: string) => {
    if (!selectedDate || !editingTask) return;
    dispatch({
      type: 'UPDATE_TASK',
      date: selectedDate,
      taskId: editingTask.id,
      updates: { color, emoji, content },
    });
    setEditingTask(null);
  }, [selectedDate, editingTask, dispatch]);

  const handleDeleteTask = useCallback(() => {
    if (!selectedDate || !editingTask) return;
    dispatch({ type: 'DELETE_TASK', date: selectedDate, taskId: editingTask.id });
    setEditingTask(null);
  }, [selectedDate, editingTask, dispatch]);

  const handleTaskClick = useCallback((task: Task) => {
    if (editMode) {
      setEditingTask(task);
      return;
    }
    if (coloringState.phase !== 'idle' && coloringState.taskId === task.id) {
      cancelColoring();
    } else {
      selectTask(task.id);
    }
  }, [editMode, coloringState, selectTask, cancelColoring]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <button className={styles.headerBtn} onClick={() => setShowForm(true)} aria-label="Add task">
          <PlusIcon size={20} />
        </button>
        <button
          className={`${styles.textBtn} ${editMode ? styles.activeEdit : ''}`}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className={styles.list}>
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>{i18n.noTasks}</div>
        ) : (
          <>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                coloringState={coloringState}
                onSelect={() => handleTaskClick(task)}
              />
            ))}
            {coloringState.phase === 'idle' && !editMode && (
              <div className={styles.hint}>Tap a task, then color the grid</div>
            )}
            {editMode && (
              <div className={styles.hint}>Tap a task to edit, then press Done</div>
            )}
          </>
        )}
      </div>

      {showForm && (
        <TaskForm
          onSave={handleAddTask}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSave={handleEditTask}
          onDelete={handleDeleteTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
