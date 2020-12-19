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

// TODO: move to rendering file
export const WHITE_KEY_COLOR_DEFAULT = '#f5f6fa';
export const WHITE_KEY_COLOR_PRESSED = '#9E9E9E';
export const BLACK_KEY_COLOR_DEFAULT = '#000000';
export const BLACK_KEY_COLOR_PRESSED = '#292929';
export const LEFT_HAND_NOTE_COLOR_DEFAULT = '#43A047';
export const LEFT_HAND_NOTE_COLOR_PLAYED = '#2E7D32';
export const RIGHT_HAND_NOTE_COLOR_DEFAULT = '#1E88E5';
export const RIGHT_HAND_NOTE_COLOR_PLAYED = '#1565C0';
export const NO_HAND_NOTE_COLOR_DEFAULT = '#D81B60';
export const NO_HAND_NOTE_COLOR_PLAYED = '#AD1457';
export const NOTE_BLOCK_BORDER_COLOR_DEFAULT = '#000000';
export const OCTAVE_DIVIDER_COLOR = '#2b2b2b';

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

// Computes nonnegative modulo remainder
const mod = (n: number, m: number) => ((n % m) + m) % m;

// Calculates a given note's index in an octave
export const octaveIndex = (note: number) =>
  mod(note - MIDDLE_C_NOTE, NOTES_PER_OCTAVE);

// Returns array of consecutive integers from start to end (inclusive).
const range = (start: number, end: number) => {
  const nums = [];
  for (let i = start; i <= end; i++) {
    nums.push(i);
  }
  return nums;
};

// Maps keyboards to their range of notes
export const KEYBOARD_NOTE_RANGES: Record<Keyboard, number[]> = {
  '49-key': range(36, 84),
  '61-key': range(36, 96),
  '76-key': range(28, 103),
  '88-key': range(21, 108),
};

// Returns the name of the given note
export const noteName = (note: number) => NOTE_NAMES[octaveIndex(note)];

// Returns whether note is natural
export const isNatural = (note: number) =>
  NATURAL_NOTE_OCTAVE_POSITIONS.includes(octaveIndex(note));

// Returns the horizontal offset of the given note from the previous note
export const horizontalOffset = (note: number) =>
  HORIZONTAL_OFFSETS[octaveIndex(note)];

// Represents a note from a song
export interface SongNote {
  note: number;
  time: number;
  duration: number;
  velocity: number;
  hand?: Hand;
}

// Returns how far value is outside the range [min, max].
export const distFromRange = (value: number, min: number, max: number) => {
  if (value < min) return min - value;
  if (value > max) return value - max;
  return 0;
};
