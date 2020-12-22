import { Midi } from '@tonejs/midi';
import { DEFAULT_KEYBOARD_SIZE } from '../constants/keyboard';
import { DEFAULT_TEMPO } from '../constants/tempo';
import { DEFAULT_TRANSPOSE } from '../constants/transpose';
import KeyboardSize from '../enums/KeyboardSize';
import Note from '../types/Note';

export interface AppState {
  isPaused: boolean;
  waitModeEnabled: boolean;
  tempo: number;
  keyboardSize: KeyboardSize;
  transpose: number;
  notes: number[];
  song?: Midi;
}

export const DEFAULT_APP_STATE: AppState = {
  isPaused: true,
  waitModeEnabled: true,
  tempo: DEFAULT_TEMPO,
  keyboardSize: DEFAULT_KEYBOARD_SIZE,
  transpose: DEFAULT_TRANSPOSE,
  notes: [],
};

export type AppAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'upload'; song: Midi }
  | { type: 'enable-wait-mode' }
  | { type: 'disable-wait-mode' }
  | { type: 'update-tempo'; tempo: number }
  | { type: 'update-keyboard-size'; keyboardSize: KeyboardSize }
  | { type: 'update-transpose'; transpose: number }
  | { type: 'play-note'; note: Note }
  | { type: 'rest-note'; note: Note };

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
      };
    }
    case 'upload':
      return {
        ...state,
        song: action.song,
      };
    case 'enable-wait-mode':
      return {
        ...state,
        waitModeEnabled: true,
      };
    case 'disable-wait-mode':
      return {
        ...state,
        waitModeEnabled: false,
      };
    case 'update-tempo':
      return {
        ...state,
        tempo: action.tempo,
      };
    case 'update-keyboard-size':
      return {
        ...state,
        keyboardSize: action.keyboardSize,
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
    default:
      return state;
  }
};

export default appReducer;
