import { grey } from '@material-ui/core/colors';
import KeyboardSize from '../enums/KeyboardSize';
import NoteRange from '../interfaces/NoteRange';
import KeyPalette from '../types/KeyPalette';

// Colors
export const KEY_PALETTE: KeyPalette = {
  white: {
    unpressed: grey[100],
    pressed: grey[400],
  },
  black: {
    unpressed: '#000000',
    pressed: '#292929',
  },
};

// Note Ranges
export const KEYBOARD_NOTE_RANGES: Record<KeyboardSize, NoteRange> = {
  '49-key': { min: 36, max: 84 },
  '61-key': { min: 36, max: 96 },
  '76-key': { min: 28, max: 103 },
  '88-key': { min: 21, max: 108 },
};

// Ratios
export const WHITE_KEY_WIDTH_TO_HEIGHT_RATIO = 1 / 4;
export const BLACK_KEY_WIDTH_TO_HEIGHT_RATIO = 1 / 5;
export const BLACK_KEY_TO_WHITE_KEY_WIDTH_RATIO = 1 / 2;
export const KEY_BORDER_RADIUS_TO_WIDTH_RATIO = 1 / 4;
export const WHITE_KEY_SPACE_TO_WIDTH_RATIO = 1 / 25;
export const KEY_TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO = 1 / 16;
export const KEY_BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH_RATIO = 1 / 8;
export const BLACK_KEY_VERTICAL_OFFSET_TO_HEIGHT_RATIO = 1 / 200;

// Notes
export const MIDDLE_C_NOTE = 60;
export const NOTES_PER_OCTAVE = 12;
export const NATURAL_NOTE_OCTAVE_POSITIONS = [0, 2, 4, 5, 7, 9, 11];

// List of horizontal offsets of keys relative to the position of previous key
export const KEY_OFFSETS = [
  1,
  0.6,
  0.4,
  0.76,
  0.24,
  1,
  0.6,
  0.4,
  0.7,
  0.3,
  0.76,
  0.24,
];
