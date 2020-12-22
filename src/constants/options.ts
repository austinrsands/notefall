import GameMode from '../enums/GameMode';
import KeyboardType from '../enums/KeyboardType';

// Game mode
export const DEFAULT_GAME_MODE = GameMode.WaitForKey;

// Keyboard size
export const DEFAULT_KEYBOARD_SIZE = KeyboardType.SixtyOneKey;

// Tempo
export const MIN_TEMPO = 10;
export const MAX_TEMPO = 200;
export const DEFAULT_TEMPO = 120;

// Transpose
export const MIN_TRANSPOSE = -3;
export const MAX_TRANSPOSE = 3;
export const DEFAULT_TRANSPOSE = 0;
