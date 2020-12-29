import { blue, green, pink } from '@material-ui/core/colors';
import { KeyType } from '../keyboard/structures';
import { Hand, NoteBlockState } from './structures';

// Colors
type NoteBlockPalette = Record<
  Hand,
  Record<KeyType, Record<NoteBlockState, string>>
>;
export const NOTE_BLOCK_PALETTE: NoteBlockPalette = {
  left: {
    white: {
      unplayed: blue.A700,
      played: '#105986',
    },
    black: {
      unplayed: blue[900],
      played: '#0D416A',
    },
  },
  right: {
    white: {
      unplayed: green.A700,
      played: '#167063',
    },
    black: {
      unplayed: green[800],
      played: '#144D47',
    },
  },
  unknown: {
    white: {
      unplayed: pink.A700,
      played: '#731842',
    },
    black: {
      unplayed: pink[900],
      played: '#551838',
    },
  },
};

// Ratios
export const NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO = 1 / 8;
export const NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO = 1 / 4;
export const UNIT_NOTE_BLOCK_HEIGHT_TO_KEYBOARD_HEIGHT_RATIO = 2 / 3;

// Bigger denominator = more tolerance
export const NOTE_BLOCK_TOLERANCE_FACTOR = 1 / 500;
