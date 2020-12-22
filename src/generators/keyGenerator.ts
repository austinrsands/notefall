import {
  WHITE_KEY_SPACE_TO_WIDTH_RATIO,
  WHITE_KEY_WIDTH_TO_HEIGHT_RATIO,
  BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO,
  BLACK_KEY_WIDTH_TO_HEIGHT_RATIO,
  BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT_RATIO,
  KEY_TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO,
  KEY_BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO,
  KEY_OFFSETS,
  MIDDLE_C_NOTE,
  NATURAL_NOTE_OCTAVE_POSITIONS,
  NOTES_PER_OCTAVE,
  KEYBOARD_NOTE_RANGES,
} from '../constants/keyboard';
import Key from '../interfaces/Key';
import NoteRange from '../interfaces/NoteRange';
import Scale from '../interfaces/Scale';
import KeyboardSize from '../enums/KeyboardSize';
import KeyType from '../enums/KeyType';
import Note from '../types/Note';

// Computes nonnegative modulo remainder
const mod = (n: number, m: number) => ((n % m) + m) % m;

// Calculates a given note's index in an octave
const octaveIndex = (note: Note) => mod(note - MIDDLE_C_NOTE, NOTES_PER_OCTAVE);

// Returns whether note is natural
const isNatural = (note: Note) =>
  NATURAL_NOTE_OCTAVE_POSITIONS.includes(octaveIndex(note));

// Returns the horizontal offset of the given note from the previous note
const horizontalOffset = (note: Note) => KEY_OFFSETS[octaveIndex(note)];

// Returns the range of notes for the given transposed keyboard
const noteRange = (keyboardSize: KeyboardSize, transpose: number) => {
  const octaveOffset = transpose * NOTES_PER_OCTAVE;
  const untransposedNoteRange = KEYBOARD_NOTE_RANGES[keyboardSize];
  return {
    min: untransposedNoteRange.min + octaveOffset,
    max: untransposedNoteRange.max + octaveOffset,
  };
};

// Returns the number of white keys in the given note range
const numWhiteKeysInRange = (range: NoteRange) => {
  let count = 0;
  for (let note = range.min; note <= range.max; note++) {
    if (isNatural(note)) count += 1;
  }
  return count;
};

// Used to separate black keys from white
const compareKeys = (a: Key, b: Key) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.White && b.type === KeyType.Black) return 1;
  return 0;
};

// Returns list of key objects
const generateKeys = (
  canvasScale: Scale,
  keyboardSize: KeyboardSize,
  transpose: number,
) => {
  const range = noteRange(keyboardSize, transpose);
  const numWhiteKeys = numWhiteKeysInRange(range);
  const whiteKeyWidth =
    canvasScale.width /
    (numWhiteKeys + numWhiteKeys * WHITE_KEY_SPACE_TO_WIDTH_RATIO);
  const whiteKeyHeight = whiteKeyWidth / WHITE_KEY_WIDTH_TO_HEIGHT_RATIO;
  const blackKeyWidth = whiteKeyWidth * BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO;
  const blackKeyHeight = blackKeyWidth / BLACK_KEY_WIDTH_TO_HEIGHT_RATIO;
  const whiteKeySpace = whiteKeyWidth * WHITE_KEY_SPACE_TO_WIDTH_RATIO;

  // Build keys
  const keys: Key[] = [];
  let keyX = whiteKeySpace / 2;
  const keyY = canvasScale.height - whiteKeyHeight;
  for (let note = range.min; note <= range.max; note++) {
    // Determine properties
    const keyType = isNatural(note) ? KeyType.White : KeyType.Black;
    const keyWidth = keyType === KeyType.White ? whiteKeyWidth : blackKeyWidth;
    const keyHeight =
      keyType === KeyType.White ? whiteKeyHeight : blackKeyHeight;
    const keyVerticalOffset =
      keyType === KeyType.White
        ? 0
        : blackKeyHeight * BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT_RATIO;
    const topCornerRadius =
      keyWidth * KEY_TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO;
    const bottomCornerRadius =
      keyWidth * KEY_BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO;

    // Push key to array
    keys.push({
      note,
      type: keyType,
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
    if (keyType === KeyType.White) keyX += whiteKeySpace;
  }
  return keys.sort(compareKeys);
};

export default generateKeys;
