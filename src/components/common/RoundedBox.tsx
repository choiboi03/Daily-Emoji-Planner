import styles from './RoundedBox.module.css'

interface RoundedBoxProps {
  color: string | null;
  emoji?: string | null;
  size?: 'small' | 'medium' | 'large' | 'calendarPreview';
  className?: string;
}

export default function RoundedBox({ color, emoji, size = 'medium', className = '' }: RoundedBoxProps) {
  const isEmpty = !color;

  return (
    <div
      className={`${styles.box} ${styles[size]} ${isEmpty ? styles.empty : ''} ${className}`}
      style={color ? { backgroundColor: color } : undefined}
    >
      {emoji || ''}
    </div>
  );
}
