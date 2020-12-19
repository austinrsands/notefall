import { Midi } from '@tonejs/midi';
import { DEFAULT_KEYBOARD, DEFAULT_TEMPO, Keyboard } from '../piano/piano';

export interface AppState {
  isPaused: boolean;
  waitModeEnabled: boolean;
  tempo: number;
  keyboard: Keyboard;
  song?: Midi;
}

export const DEFAULT_APP_STATE: AppState = {
  isPaused: true,
  waitModeEnabled: true,
  tempo: DEFAULT_TEMPO,
  keyboard: DEFAULT_KEYBOARD,
};

export type AppAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'upload'; song: Midi }
  | { type: 'enable-wait-mode' }
  | { type: 'disable-wait-mode' }
  | { type: 'update-tempo'; tempo: number }
  | { type: 'update-keyboard'; keyboard: Keyboard };

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
    default:
      return state;
  }
};

export default appReducer;
