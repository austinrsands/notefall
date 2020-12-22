import Key from './Key';
import NoteRange from './NoteRange';
import Position from './Position';
import Size from './Size';

interface Keyboard {
  position: Position;
  size: Size;
  noteRange: NoteRange;
  keys: Key[];
}

export default Keyboard;
