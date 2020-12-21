import NoteRange from '../interfaces/NoteRange';

export type KeyboardSize = '49-key' | '61-key' | '76-key' | '88-key';
export const KEYBOARDS_SIZES: KeyboardSize[] = [
  '49-key',
  '61-key',
  '76-key',
  '88-key',
];
export const DEFAULT_KEYBOARD_SIZE: KeyboardSize = '61-key';

export const MIN_TRANSPOSE = -3;
export const DEFAULT_TRANSPOSE = 0;
export const MAX_TRANSPOSE = 3;

// Maps keyboard sizes to their range of notes
export const KEYBOARD_NOTE_RANGES: Record<KeyboardSize, NoteRange> = {
  '49-key': { min: 36, max: 84 },
  '61-key': { min: 36, max: 96 },
  '76-key': { min: 28, max: 103 },
  '88-key': { min: 21, max: 108 },
};
