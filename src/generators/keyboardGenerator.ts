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
import InclusiveRange from '../interfaces/InclusiveRange';
import Size from '../interfaces/Size';
import KeyboardType from '../enums/KeyboardType';
import KeyType from '../enums/KeyType';
import Note from '../types/Note';
import Position from '../interfaces/Position';
import Keyboard from '../interfaces/Keyboard';

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
const noteRange = (
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
const numWhiteKeysInRange = (range: InclusiveRange) => {
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

const generateKeys = (
  whiteKeySize: Size,
  blackKeySize: Size,
  keyboardPosition: Position,
  range: InclusiveRange,
) => {
  // Initialize array
  const keys: Key[] = [];

  // Determine spacing
  const whiteKeySpace = whiteKeySize.width * WHITE_KEY_SPACE_TO_WIDTH_RATIO;

  // Determine starting position
  let keyX = keyboardPosition.x + whiteKeySpace / 2;
  const keyY = keyboardPosition.y;

  // Loop through notes
  for (let note = range.min; note <= range.max; note++) {
    // Determine type
    const keyType = isNatural(note) ? KeyType.White : KeyType.Black;

    // Determine size
    const keySize = keyType === KeyType.White ? whiteKeySize : blackKeySize;

    // Determine position
    const keyVerticalOffset =
      keyType === KeyType.White
        ? 0
        : blackKeySize.height * BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT_RATIO;
    const keyPosition = { x: keyX, y: keyY - keyVerticalOffset };

    // Determine corner radii
    const topCornerRadius =
      keySize.width * KEY_TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO;
    const bottomCornerRadius =
      keySize.width * KEY_BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO;

    // Push key to array
    keys.push({
      note,
      type: keyType,
      position: keyPosition,
      size: keySize,
      cornerRadii: {
        topLeft: topCornerRadius,
        topRight: topCornerRadius,
        bottomRight: bottomCornerRadius,
        bottomLeft: bottomCornerRadius,
      },
    });

    // Increment x position of key by the relative offset of the next key
    const xOffset = horizontalOffset(note + 1);
    if (xOffset) keyX += xOffset * whiteKeySize.width;

    // Handle spacing
    if (keyType === KeyType.White) keyX += whiteKeySpace;
  }
  return keys.sort(compareKeys);
};

const generateKeyboard = (
  canvasSize: Size,
  keyboardType: KeyboardType,
  transpose: number,
): Keyboard => {
  // Determine range of notes for the given transposed keyboard
  const range = noteRange(keyboardType, transpose);

  // Determine number of white keys
  const numWhiteKeys = numWhiteKeysInRange(range);

  // Determine size of white keys
  const whiteKeyWidth =
    canvasSize.width /
    (numWhiteKeys + numWhiteKeys * WHITE_KEY_SPACE_TO_WIDTH_RATIO);
  const whiteKeyHeight = whiteKeyWidth / WHITE_KEY_WIDTH_TO_HEIGHT_RATIO;
  const whiteKeySize = { width: whiteKeyWidth, height: whiteKeyHeight };

  // Determine size of black keys
  const blackKeyWidth = whiteKeyWidth * BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO;
  const blackKeyHeight = blackKeyWidth / BLACK_KEY_WIDTH_TO_HEIGHT_RATIO;
  const blackKeySize = { width: blackKeyWidth, height: blackKeyHeight };

  // Determine position of keyboard
  const keyboardPosition = { x: 0, y: canvasSize.height - whiteKeyHeight };

  // Determine size of keyboard
  const keyboardSize = { width: canvasSize.width, height: whiteKeyHeight };

  // Generate keys
  const keys = generateKeys(
    whiteKeySize,
    blackKeySize,
    keyboardPosition,
    range,
  );

  return {
    position: keyboardPosition,
    size: keyboardSize,
    range,
    keys,
  };
};

export default generateKeyboard;
