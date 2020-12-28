import { GameMode } from '../../contexts/game-context/structures';
import { KeyboardType } from '../sketch/keyboard/structures';

// Game mode
export const DEFAULT_GAME_MODE = GameMode.WaitForKey;

// Keyboard size
export const DEFAULT_KEYBOARD_SIZE = KeyboardType.SixtyOneKey;

// Tempo scale
export const MIN_TEMPO_SCALE = 0.1;
export const MAX_TEMPO_SCALE = 3;
export const DEFAULT_TEMPO_SCALE = 1;
export const TEMPO_SCALE_STEP = 0.25;

// Transpose
export const MIN_TRANSPOSE = -3;
export const MAX_TRANSPOSE = 3;
export const DEFAULT_TRANSPOSE = 0;
