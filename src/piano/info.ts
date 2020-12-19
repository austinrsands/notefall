// Tempo
export const MIN_TEMPO = 10;
export const MAX_TEMPO = 200;
export const DEFAULT_TEMPO = 120;

// Keyboard
export type Keyboard = '49-key' | '61-key' | '76-key' | '88-key';
export const KEYBOARDS: Keyboard[] = ['49-key', '61-key', '76-key', '88-key'];
export const DEFAULT_KEYBOARD: Keyboard = '61-key';

// Keys
export const WHITE_KEY_WIDTH_HEIGHT_RATIO = 1 / 4;
export const BLACK_KEY_WIDTH_HEIGHT_RATIO = 1 / 4;
export const BLACK_KEY_WHITE_KEY_HEIGHT_RATIO = 3 / 5;

// Notes
export const MIDDLE_C_NOTE = 60;
export const NOTES_PER_OCTAVE = 12;
export const NOTE_NAMES = [
  'C',
  'C♯\nD♭',
  'D',
  'D♯\nE♭',
  'E',
  'F',
  'F♯\nG♭',
  'G',
  'G♯\nA♭',
  'A',
  'A♯\nB♭',
  'B',
];
export const NATURAL_NOTE_OCTAVE_POSITIONS = [0, 2, 4, 5, 7, 9, 11];

// List of horizontal offsets of notes relative to the position of previous note
export const HORIZONTAL_OFFSETS = [
  1,
  0.6,
  0.4,
  0.76,
  0.24,
  1,
  0.6,
  0.4,
  0.7,
  0.3,
  0.76,
  0.24,
];

// Hand
export type Hand = 'left' | 'right';
