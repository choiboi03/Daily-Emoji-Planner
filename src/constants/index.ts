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
  selectStart: '시작 시간을 선택하세요',
  selectEnd: '끝 시간을 선택하세요',
  addTask: '태스크 추가',
  editTask: '태스크 편집',
  deleteTask: '삭제',
  cancel: '취소',
  save: '저장',
  taskContent: '할 일을 입력하세요',
  noTasks: '태스크를 추가해보세요',
  backup: '백업',
  restore: '리스토어',
  lightMode: '라이트 모드',
  darkMode: '다크 모드',
  settings: '설정',
  share: '공유',
} as const;

export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
