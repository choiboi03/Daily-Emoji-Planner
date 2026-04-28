import type { Language } from '../types'

export interface Translations {
  // TaskItem / coloring hints
  selectStart: string;
  selectEnd: string;
  noTasks: string;
  colorHint: string;
  editHint: string;

  // TaskPanel buttons
  edit: string;
  done: string;

  // TaskForm
  newTask: string;
  editTask: string;
  color: string;
  emojiAndContent: string;
  taskPlaceholder: string;
  pickEmoji: string;
  cancel: string;
  save: string;
  deleteTask: string;

  // SettingsPanel
  settings: string;
  appearance: string;
  darkMode: string;
  language: string;
  close: string;

  // aria labels
  addTask: string;
  backToCalendar: string;
  prevMonth: string;
  nextMonth: string;
  openSettings: string;

  // time/duration units
  hoursUnit: (hours: number) => string;
  minutesUnit: (minutes: number) => string;

  // calendar
  monthNames: string[];
  daysOfWeek: string[];
  formatMonthYear: (year: number, monthIndex: number) => string;
  formatDisplayDate: (dateKey: string) => string;
}

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_NAMES_KO = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

export const translations: Record<Language, Translations> = {
  en: {
    selectStart: 'Select start time',
    selectEnd: 'Select end time',
    noTasks: 'Tap + to add a task',
    colorHint: 'Tap a task, then color the grid',
    editHint: 'Tap a task to edit, then press Done',

    edit: 'Edit',
    done: 'Done',

    newTask: 'New Task',
    editTask: 'Edit Task',
    color: 'Color',
    emojiAndContent: 'Emoji & Content',
    taskPlaceholder: "What's the task?",
    pickEmoji: 'Pick emoji',
    cancel: 'Cancel',
    save: 'Save',
    deleteTask: 'Delete Task',

    settings: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    language: 'Language',
    close: 'Close',

    addTask: 'Add task',
    backToCalendar: 'Back to calendar',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    openSettings: 'Settings',

    hoursUnit: (h) => `${h}hr`,
    minutesUnit: (m) => `${m}min`,

    monthNames: MONTH_NAMES_EN,
    daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    formatMonthYear: (year, monthIndex) => `${MONTH_NAMES_EN[monthIndex]} ${year}`,
    formatDisplayDate: (dateKey) => {
      const [y, m, d] = dateKey.split('-');
      return `${y}. ${Number(m)}. ${Number(d)}.`;
    },
  },
  ko: {
    selectStart: '시작 시간을 선택하세요',
    selectEnd: '종료 시간을 선택하세요',
    noTasks: '+ 버튼을 눌러 할 일을 추가하세요',
    colorHint: '할 일을 선택한 뒤 시간표를 색칠하세요',
    editHint: '수정할 할 일을 선택하고 완료를 누르세요',

    edit: '수정',
    done: '완료',

    newTask: '새로운 할 일',
    editTask: '할 일 수정',
    color: '색상',
    emojiAndContent: '이모지와 내용',
    taskPlaceholder: '무엇을 할 예정인가요?',
    pickEmoji: '이모지 선택',
    cancel: '취소',
    save: '저장',
    deleteTask: '할 일 삭제',

    settings: '설정',
    appearance: '화면',
    darkMode: '다크 모드',
    language: '언어',
    close: '닫기',

    addTask: '할 일 추가',
    backToCalendar: '달력으로 돌아가기',
    prevMonth: '이전 달',
    nextMonth: '다음 달',
    openSettings: '설정',

    hoursUnit: (h) => `${h}시간`,
    minutesUnit: (m) => `${m}분`,

    monthNames: MONTH_NAMES_KO,
    daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
    formatMonthYear: (year, monthIndex) => `${year}년 ${MONTH_NAMES_KO[monthIndex]}`,
    formatDisplayDate: (dateKey) => {
      const [y, m, d] = dateKey.split('-');
      return `${y}년 ${Number(m)}월 ${Number(d)}일`;
    },
  },
};
