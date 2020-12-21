import NoteRange from '../interfaces/NoteRange';
import KeyboardSize from '../types/KeyboardSize';

export const KEYBOARDS_SIZES: KeyboardSize[] = [
  '49-key',
  '61-key',
  '76-key',
  '88-key',
];
export const DEFAULT_KEYBOARD_SIZE: KeyboardSize = '61-key';

// Maps keyboard sizes to their range of notes
export const KEYBOARD_NOTE_RANGES: Record<KeyboardSize, NoteRange> = {
  '49-key': { min: 36, max: 84 },
  '61-key': { min: 36, max: 96 },
  '76-key': { min: 28, max: 103 },
  '88-key': { min: 21, max: 108 },
};
