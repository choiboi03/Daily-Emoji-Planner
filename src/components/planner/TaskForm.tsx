import { useState } from 'react'
import EmojiPicker, { type EmojiClickData, Theme } from 'emoji-picker-react'
import { useSettings, useTranslation } from '../../context/SettingsContext'
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
  const t = useTranslation();
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
        <div className={styles.title}>{task ? t.editTask : t.newTask}</div>

        <div className={styles.section}>
          <span className={styles.label}>{t.color}</span>
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
          <span className={styles.label}>{t.emojiAndContent}</span>
          <div className={styles.previewRow}>
            <RoundedBox color={color} emoji={emoji} size="large" />
            <button
              type="button"
              className={`${styles.emojiBtn} ${emoji ? styles.emojiBtnFilled : styles.emojiBtnEmpty}`}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label={t.pickEmoji}
              aria-expanded={showEmojiPicker}
            >
              <span className={styles.emojiGlyph}>{emoji || '😀'}</span>
              <span className={styles.emojiBadge} aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <input
              className={styles.input}
              placeholder={t.taskPlaceholder}
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
          <button className={styles.cancelBtn} onClick={onClose}>{t.cancel}</button>
          <button className={styles.saveBtn} onClick={handleSave}>{t.save}</button>
        </div>

        {task && onDelete && (
          <button className={styles.deleteBtn} onClick={onDelete}>{t.deleteTask}</button>
        )}
      </div>
    </div>
  );
}
