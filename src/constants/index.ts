export const COLOR_PALETTE = [
  '#FF6B6B', // coral red
  '#FF8E53', // orange
  '#FFC145', // golden yellow
  '#51CF66', // green
  '#20C997', // teal
  '#339AF0', // blue
  '#7950F2', // violet
  '#CC5DE8', // purple
  '#F06595', // pink
  '#A9E34B', // lime
  '#74C0FC', // light blue
  '#E599F7', // lavender
] as const;

export const STORAGE_KEY = 'daily-emoji-planner-data';

export const i18n = {
  selectStart: 'Select start time',
  selectEnd: 'Select end time',
  noTasks: 'Tap + to add a task',
  colorHint: 'Tap a task, then color the grid',
} as const;

export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
