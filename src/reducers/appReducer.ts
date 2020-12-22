import { Midi } from '@tonejs/midi';
import {
  DEFAULT_TEMPO,
  DEFAULT_KEYBOARD_SIZE,
  DEFAULT_TRANSPOSE,
  DEFAULT_GAME_MODE,
} from '../constants/options';
import GameMode from '../enums/GameMode';
import KeyboardType from '../enums/KeyboardType';
import Note from '../types/Note';

export interface AppState {
  isPaused: boolean;
  mode: GameMode;
  tempo: number;
  keyboardType: KeyboardType;
  transpose: number;
  notes: number[];
  song?: Midi;
  progress: number;
}

export const DEFAULT_APP_STATE: AppState = {
  isPaused: true,
  mode: DEFAULT_GAME_MODE,
  tempo: DEFAULT_TEMPO,
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
  | { type: 'update-tempo'; tempo: number }
  | { type: 'update-keyboard-type'; keyboardType: KeyboardType }
  | { type: 'update-transpose'; transpose: number }
  | { type: 'play-note'; note: Note }
  | { type: 'rest-note'; note: Note }
  | { type: 'increment-progress'; amount: number };

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        isPaused: false,
      };
    case 'pause': {
      return {
        ...state,
        isPaused: true,
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
    case 'update-tempo':
      return {
        ...state,
        tempo: action.tempo,
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
    case 'increment-progress':
      return {
        ...state,
        progress: state.progress + action.amount,
      };
    default:
      return state;
  }
};

export default appReducer;
