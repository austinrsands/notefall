import { blueGrey, pink, purple } from '@material-ui/core/colors';
import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';
import NoteBlockState from '../enums/NoteBlockState';

// Colors
type NoteBlockPalette = Record<
  Hand,
  Record<KeyType, Record<NoteBlockState, string>>
>;
export const NOTE_BLOCK_PALETTE: NoteBlockPalette = {
  left: {
    white: {
      unplayed: pink[200],
      played: pink[700],
    },
    black: {
      unplayed: pink[400],
      played: pink[800],
    },
  },
  right: {
    white: {
      unplayed: purple[200],
      played: purple[700],
    },
    black: {
      unplayed: purple[400],
      played: purple[800],
    },
  },
  unknown: {
    white: {
      unplayed: blueGrey[200],
      played: blueGrey[700],
    },
    black: {
      unplayed: blueGrey[400],
      played: blueGrey[800],
    },
  },
};

// Ratios
export const NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO = 1 / 8;
export const NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO = 1 / 4;
export const UNIT_NOTE_BLOCK_LENGTH_TO_KEYBOARD_HEIGHT_RATIO = 2 / 3;
export const NOTE_BLOCK_TOLERANCE_TO_LENGTH_RATIO = 1 / 10;
