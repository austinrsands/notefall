import {
  WHITE_KEY_SPACE_TO_WIDTH_RATIO,
  WHITE_KEY_WIDTH_TO_HEIGHT_RATIO,
  BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO,
  BLACK_KEY_WIDTH_TO_HEIGHT_RATIO,
  BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT,
  TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
  BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
} from '../constants/keys';
import Key from '../interfaces/Key';
import Scale from '../interfaces/Scale';
import KeyboardSize from '../types/KeyboardSize';
import {
  numWhiteKeysInRange,
  isNatural,
  horizontalOffset,
  noteRange,
} from './helpers';

// Used to separate black keys from white
const compareKeys = (a: Key, b: Key) => {
  if (a.isNatural && !b.isNatural) return -1;
  if (!a.isNatural && b.isNatural) return 1;
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
  return keys.sort(compareKeys);
};

export default generateKeys;
