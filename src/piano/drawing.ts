// Colors
export const WHITE_KEY_COLOR_DEFAULT = '#f5f6fa';
export const WHITE_KEY_COLOR_PRESSED = '#9E9E9E';
export const BLACK_KEY_COLOR_DEFAULT = '#000000';
export const BLACK_KEY_COLOR_PRESSED = '#292929';
export const LEFT_HAND_NOTE_COLOR_DEFAULT = '#43A047';
export const LEFT_HAND_NOTE_COLOR_PLAYED = '#2E7D32';
export const RIGHT_HAND_NOTE_COLOR_DEFAULT = '#1E88E5';
export const RIGHT_HAND_NOTE_COLOR_PLAYED = '#1565C0';
export const NO_HAND_NOTE_COLOR_DEFAULT = '#D81B60';
export const NO_HAND_NOTE_COLOR_PLAYED = '#AD1457';
export const NOTE_BLOCK_BORDER_COLOR_DEFAULT = '#000000';
export const OCTAVE_DIVIDER_COLOR = '#2b2b2b';

const drawWhiteKeys = (context: CanvasRenderingContext2D) => {};

const drawBlackKeys = (context: CanvasRenderingContext2D) => {};

const drawOctaveMarkers = (context: CanvasRenderingContext2D) => {};

export const drawBackground = (context: CanvasRenderingContext2D) => {
  drawOctaveMarkers(context);
};

export const drawNoteBlocks = (context: CanvasRenderingContext2D) => {};

export const drawKeyboard = (context: CanvasRenderingContext2D) => {
  drawWhiteKeys(context);
  drawBlackKeys(context);
};
