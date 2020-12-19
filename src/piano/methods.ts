import {
  MIDDLE_C_NOTE,
  NOTES_PER_OCTAVE,
  Keyboard,
  NOTE_NAMES,
  NATURAL_NOTE_OCTAVE_POSITIONS,
  HORIZONTAL_OFFSETS,
  Hand,
} from './info';

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
