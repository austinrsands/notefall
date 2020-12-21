import {
  PRESSED_WHITE_KEY_COLOR,
  PRESSED_BLACK_KEY_COLOR,
  DEFAULT_WHITE_KEY_COLOR,
  DEFAULT_BLACK_KEY_COLOR,
} from '../constants/colors';
import { KeyboardSize, KEYBOARD_NOTE_RANGES } from '../constants/keyboard';
import { KEY_OFFSETS } from '../constants/keys';
import {
  MIDDLE_C_NOTE,
  NOTES_PER_OCTAVE,
  NOTE_NAMES,
  NATURAL_NOTE_OCTAVE_POSITIONS,
} from '../constants/notes';
import Key from '../interfaces/Key';
import NoteRange from '../interfaces/NoteRange';

// Computes nonnegative modulo remainder
const mod = (n: number, m: number) => ((n % m) + m) % m;

// Calculates a given note's index in an octave
export const octaveIndex = (note: number) =>
  mod(note - MIDDLE_C_NOTE, NOTES_PER_OCTAVE);

// Returns the name of the given note
export const noteName = (note: number) => NOTE_NAMES[octaveIndex(note)];

// Returns whether note is natural
export const isNatural = (note: number) =>
  NATURAL_NOTE_OCTAVE_POSITIONS.includes(octaveIndex(note));

// Returns the horizontal offset of the given note from the previous note
export const horizontalOffset = (note: number) =>
  KEY_OFFSETS[octaveIndex(note)];

// Returns the range of notes for the given transposed keyboard
export const noteRange = (keyboardSize: KeyboardSize, transpose: number) => {
  const octaveOffset = transpose * NOTES_PER_OCTAVE;
  const untransposedNoteRange = KEYBOARD_NOTE_RANGES[keyboardSize];
  return {
    min: untransposedNoteRange.min + octaveOffset,
    max: untransposedNoteRange.max + octaveOffset,
  };
};

// Returns the number of white keys in the given note range
export const numWhiteKeysInRange = (range: NoteRange) => {
  let count = 0;
  for (let note = range.min; note <= range.max; note++) {
    if (isNatural(note)) count += 1;
  }
  return count;
};

// Returns color of given key
export const keyColor = (key: Key, isPressed: boolean) => {
  if (isPressed) {
    return key.isNatural ? PRESSED_WHITE_KEY_COLOR : PRESSED_BLACK_KEY_COLOR;
  }
  return key.isNatural ? DEFAULT_WHITE_KEY_COLOR : DEFAULT_BLACK_KEY_COLOR;
};
