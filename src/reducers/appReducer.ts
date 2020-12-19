import { Midi } from '@tonejs/midi';
import { DEFAULT_KEYBOARD, DEFAULT_TEMPO, Keyboard } from '../piano/info';

export interface AppState {
  isPaused: boolean;
  waitModeEnabled: boolean;
  tempo: number;
  keyboard: Keyboard;
  notes: number[];
  song?: Midi;
}

export const DEFAULT_APP_STATE: AppState = {
  isPaused: true,
  waitModeEnabled: true,
  tempo: DEFAULT_TEMPO,
  keyboard: DEFAULT_KEYBOARD,
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
  | { type: 'update-keyboard'; keyboard: Keyboard }
  | { type: 'play-note'; note: number }
  | { type: 'rest-note'; note: number };

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
    case 'update-keyboard':
      return {
        ...state,
        keyboard: action.keyboard,
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
