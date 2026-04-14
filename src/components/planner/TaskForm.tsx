import { useState } from 'react'
import EmojiPicker, { type EmojiClickData, Theme } from 'emoji-picker-react'
import { useSettings } from '../../context/SettingsContext'
import { COLOR_PALETTE } from '../../constants'
import type { Task } from '../../types'
import RoundedBox from '../common/RoundedBox'
import styles from './TaskForm.module.css'

interface TaskFormProps {
  task?: Task;
  onSave: (color: string, emoji: string | null, content: string) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function TaskForm({ task, onSave, onDelete, onClose }: TaskFormProps) {
  const { settings } = useSettings();
  const [color, setColor] = useState(task?.color || COLOR_PALETTE[0]);
  const [emoji, setEmoji] = useState<string | null>(task?.emoji || null);
  const [content, setContent] = useState(task?.content || '');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSave = () => {
    if (!content.trim()) return;
    onSave(color, emoji, content.trim());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.form}>
        <div className={styles.title}>{task ? 'Edit Task' : 'New Task'}</div>

        <div className={styles.section}>
          <span className={styles.label}>Color</span>
          <div className={styles.colorGrid}>
            {COLOR_PALETTE.map(c => (
              <div
                key={c}
                className={`${styles.colorSwatch} ${c === color ? styles.selected : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Preview & Content</span>
          <div className={styles.previewRow}>
            <RoundedBox color={color} emoji={emoji} size="large" />
            <button
              className={styles.emojiBtn}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {emoji || '+'}
            </button>
            <input
              className={styles.input}
              placeholder="What's the task?"
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
              autoFocus
            />
          </div>
        </div>

        {showEmojiPicker && (
          <div className={styles.emojiPickerWrap}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={settings.theme === 'dark' ? Theme.DARK : Theme.LIGHT}
              lazyLoadEmojis
              width={300}
              height={380}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
        </div>

        {task && onDelete && (
          <button className={styles.deleteBtn} onClick={onDelete}>Delete Task</button>
        )}
      </div>
    </div>
  );
}
