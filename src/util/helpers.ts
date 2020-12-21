import {
  PRESSED_WHITE_KEY_COLOR,
  PRESSED_BLACK_KEY_COLOR,
  DEFAULT_WHITE_KEY_COLOR,
  DEFAULT_BLACK_KEY_COLOR,
} from '../constants/colors';
import { KeyboardSize, KEYBOARD_NOTE_RANGES } from '../constants/keyboard';
import {
  BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO,
  BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT,
  BLACK_KEY_WIDTH_TO_HEIGHT_RATIO,
  BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
  KEY_OFFSETS,
  TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
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
  transpose: number,
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
  const octaveOffset = transpose * NOTES_PER_OCTAVE;

  // Build keys
  const keys: Key[] = [];
  let keyX = whiteKeySpace / 2;
  const keyY = height - whiteKeyHeight;
  for (
    let note = noteRange.min + octaveOffset;
    note <= noteRange.max + octaveOffset;
    note++
  ) {
    // Determine properties
    const keyIsNatural = isNatural(note);
    const keyWidth = keyIsNatural ? whiteKeyWidth : blackKeyWidth;
    const keyHeight = keyIsNatural ? whiteKeyHeight : blackKeyHeight;
    const keyVerticalOffset = keyIsNatural
      ? 0
      : blackKeyHeight * BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT;
    const topCornerRadius = keyWidth * TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;
    const bottomCornerRadius =
      keyWidth * BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;

    // Push key to array
    keys.push({
      note,
      isNatural: keyIsNatural,
      position: { x: keyX, y: keyY - keyVerticalOffset },
      scale: { width: keyWidth, height: keyHeight },
      cornerRadii: {
        topLeft: topCornerRadius,
        topRight: topCornerRadius,
        bottomRight: bottomCornerRadius,
        bottomLeft: bottomCornerRadius,
      },
    });

    // Increment x position of key by the relative offset of the next key
    const xOffset = horizontalOffset(note + 1);
    if (xOffset) keyX += xOffset * whiteKeyWidth;

    // Handle spacing
    if (keyIsNatural) keyX += whiteKeySpace;
  }
  return keys;
};

// Returns color of given key
export const keyColor = (key: Key, isPressed: boolean) => {
  if (isPressed) {
    return key.isNatural ? PRESSED_WHITE_KEY_COLOR : PRESSED_BLACK_KEY_COLOR;
  }
  return key.isNatural ? DEFAULT_WHITE_KEY_COLOR : DEFAULT_BLACK_KEY_COLOR;
};
