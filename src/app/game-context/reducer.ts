import { Midi } from '@tonejs/midi';
import { InclusiveRange } from '../../util/structures';
import {
  DEFAULT_TEMPO_SCALE,
  DEFAULT_KEYBOARD_SIZE,
  DEFAULT_TRANSPOSE,
} from '../options-menu/constants';
import { KeyboardType } from '../sketch/keyboard/structures';
import { Note } from '../sketch/note-blocks/structures';

import { GameMode } from './structures';

export interface GameState {
  isPlaying: boolean;
  mode: GameMode;
  tempoScale: number;
  keyboardType: KeyboardType;
  transpose: number;
  notes: Note[];
  song?: Midi;
  progress: number;
}

export const DEFAULT_GAME_STATE: GameState = {
  isPlaying: false,
  mode: GameMode.WaitForKey,
  tempoScale: DEFAULT_TEMPO_SCALE,
  keyboardType: DEFAULT_KEYBOARD_SIZE,
  transpose: DEFAULT_TRANSPOSE,
  notes: [],
  progress: 0,
};

export type GameAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'upload'; song: Midi }
  | { type: 'update-mode'; mode: GameMode }
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

export const gameStateReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        isPlaying: true,
      };
    case 'pause': {
      return {
        ...state,
        isPlaying: false,
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
    case 'update-mode':
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
