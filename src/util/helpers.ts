import { KeyboardSize, KEYBOARD_NOTE_RANGES } from '../constants/keyboard';
import {
  BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO,
  BLACK_KEY_WIDTH_TO_HEIGHT_RATIO,
  KEY_OFFSETS,
  WHITE_KEY_SPACE_TO_WIDTH_RATIO,
  WHITE_KEY_WIDTH_TO_HEIGHT_RATIO,
} from '../constants/keys';
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

// Returns the number of white keys in the given note range
export const numWhiteKeysInRange = (noteRange: NoteRange) => {
  let count = 0;
  for (let note = noteRange.min; note <= noteRange.max; note++) {
    if (isNatural(note)) count += 1;
  }
  return count;
};

// Used to separate black keys from white
export const compareKeys = (a: Key, b: Key) => {
  if (a.isNatural && !b.isNatural) return -1;
  if (!a.isNatural && b.isNatural) return 1;
  return 0;
};

// Returns list of key objects
export const generateKeys = (
  width: number,
  height: number,
  keyboardSize: KeyboardSize,
) => {
  // Calculate dimensions
  const noteRange = KEYBOARD_NOTE_RANGES[keyboardSize];
  const numWhiteKeys = numWhiteKeysInRange(noteRange);
  const whiteKeyWidth =
    width / (numWhiteKeys + numWhiteKeys * WHITE_KEY_SPACE_TO_WIDTH_RATIO);
  const whiteKeyHeight = whiteKeyWidth / WHITE_KEY_WIDTH_TO_HEIGHT_RATIO;
  const blackKeyWidth = whiteKeyWidth * BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO;
  const blackKeyHeight = blackKeyWidth / BLACK_KEY_WIDTH_TO_HEIGHT_RATIO;
  const whiteKeySpace = whiteKeyWidth * WHITE_KEY_SPACE_TO_WIDTH_RATIO;

  // Build keys
  const keys: Key[] = [];
  let keyX = whiteKeySpace / 2;
  const key = height - whiteKeyHeight;
  for (let note = noteRange.min; note <= noteRange.max; note++) {
    const keyIsNatural = isNatural(note);
    const keyWidth = keyIsNatural ? whiteKeyWidth : blackKeyWidth;
    const keyHeight = keyIsNatural ? whiteKeyHeight : blackKeyHeight;
    keys.push({
      note,
      isNatural: keyIsNatural,
      position: { x: keyX, y: key },
      scale: { width: keyWidth, height: keyHeight },
    });

    // Increment x position of key by the relative offset of the next key
    const xOffset = horizontalOffset(note + 1);
    if (xOffset) keyX += xOffset * whiteKeyWidth;

    // Handle spacing
    if (keyIsNatural) keyX += whiteKeySpace;
  }
  return keys;
};