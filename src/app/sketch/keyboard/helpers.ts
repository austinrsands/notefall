import { InclusiveRange } from '../../../util/structures';
import { Note } from '../note-blocks/structures';
import {
  MIDDLE_C_NOTE,
  NOTES_PER_OCTAVE,
  NATURAL_NOTE_OCTAVE_POSITIONS,
  KEY_OFFSETS,
  KEYBOARD_NOTE_RANGES,
} from './constants';
import { Key, KeyboardType, KeyType } from './structures';

// Computes nonnegative modulo remainder
const mod = (n: number, m: number) => ((n % m) + m) % m;

// Calculates a given note's index in an octave
export const octaveIndex = (note: Note) =>
  mod(note - MIDDLE_C_NOTE, NOTES_PER_OCTAVE);

// Returns whether note is natural
export const isNatural = (note: Note) =>
  NATURAL_NOTE_OCTAVE_POSITIONS.includes(octaveIndex(note));

// Returns the horizontal offset of the given note from the previous note
export const horizontalOffset = (note: Note) => KEY_OFFSETS[octaveIndex(note)];

// Returns the range of notes for the given transposed keyboard
export const noteRange = (
  keyboardType: KeyboardType,
  transpose: number,
): InclusiveRange => {
  const octaveOffset = transpose * NOTES_PER_OCTAVE;
  const untransposedNoteRange = KEYBOARD_NOTE_RANGES[keyboardType];
  return {
    min: untransposedNoteRange.min + octaveOffset,
    max: untransposedNoteRange.max + octaveOffset,
  };
};

// Returns the number of white keys in the given note range
export const numWhiteKeysInRange = (range: InclusiveRange) => {
  let count = 0;
  for (let note = range.min; note <= range.max; note++) {
    if (isNatural(note)) count += 1;
  }
  return count;
};

// Used to separate black keys from white
export const compareKeys = (a: Key, b: Key) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.White && b.type === KeyType.Black) return 1;
  return 0;
};
