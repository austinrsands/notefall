import { Midi } from '@tonejs/midi';
import {
  DEFAULT_TEMPO_SCALE,
  DEFAULT_KEYBOARD_SIZE,
  DEFAULT_TRANSPOSE,
  DEFAULT_GAME_MODE,
} from '../constants/options';
import GameMode from '../enums/GameMode';
import GameState from '../enums/GameState';
import KeyboardType from '../enums/KeyboardType';
import InclusiveRange from '../interfaces/InclusiveRange';
import Note from '../types/Note';

export interface AppState {
  gameState: GameState;
  gameMode: GameMode;
  tempoScale: number;
  keyboardType: KeyboardType;
  transpose: number;
  notes: Note[];
  song?: Midi;
  progress: number;
}

export const DEFAULT_APP_STATE: AppState = {
  gameState: GameState.Paused,
  gameMode: DEFAULT_GAME_MODE,
  tempoScale: DEFAULT_TEMPO_SCALE,
  keyboardType: DEFAULT_KEYBOARD_SIZE,
  transpose: DEFAULT_TRANSPOSE,
  notes: [],
  progress: 0,
};

export type AppAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'upload'; song: Midi }
  | { type: 'update-game-mode'; mode: GameMode }
  | { type: 'update-tempo-scale'; scale: number }
  | { type: 'update-keyboard-type'; keyboardType: KeyboardType }
  | { type: 'update-transpose'; transpose: number }
  | { type: 'play-note'; note: Note }
  | { type: 'rest-note'; note: Note }
  | {
      type: 'move';
      amount: number;
      range: InclusiveRange;
    }
  | {
      type: 'scroll';
      amount: number;
      range: InclusiveRange;
    };

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        gameState: GameState.Playing,
      };
    case 'pause': {
      return {
        ...state,
        gameState: GameState.Paused,
      };
    }
    case 'restart': {
      return {
        ...state,
        progress: 0,
      };
    }
    case 'upload':
      return {
        ...state,
        song: action.song,
        progress: 0,
      };
    case 'update-game-mode':
      return {
        ...state,
        mode: action.mode,
      };
    case 'update-tempo-scale':
      return {
        ...state,
        tempoScale: action.scale,
      };
    case 'update-keyboard-type':
      return {
        ...state,
        keyboardType: action.keyboardType,
      };
    case 'update-transpose':
      return {
        ...state,
        transpose: action.transpose,
      };
    case 'play-note':
      return {
        ...state,
        notes: state.notes.includes(action.note)
          ? state.notes
          : state.notes.concat(action.note),
      };
    case 'rest-note':
      return {
        ...state,
        notes: state.notes.filter((note) => note !== action.note),
      };
    case 'move':
      // Restart if end has been reached
      if (state.progress + action.amount > action.range.max) {
        return {
          ...state,
          progress: action.range.min,
        };
      }
      return {
        ...state,
        progress: Math.min(
          Math.max(state.progress + action.amount, action.range.min),
          action.range.max,
        ),
      };
    case 'scroll':
      return {
        ...state,
        progress: Math.min(
          Math.max(state.progress + action.amount, action.range.min),
          action.range.max,
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
