import {
  CornerRadii,
  InclusiveRange,
  Position,
  Size,
} from '../../util/structures';
import { Note } from '../note-blocks/structures';

export enum KeyType {
  White = 'white',
  Black = 'black',
}

export enum KeyState {
  Unpressed = 'unpressed',
  Pressed = 'pressed',
}

export enum KeyboardType {
  FortyNineKey = '49-key',
  SixtyOneKey = '61-key',
  SeventySixKey = '76-key',
  EightyEightKey = '88-key',
}

export interface Key {
  note: Note;
  type: KeyType;
  position: Position;
  size: Size;
  cornerRadii: CornerRadii;
}

export interface Keyboard {
  position: Position;
  size: Size;
  range: InclusiveRange;
  keys: Key[];
}
