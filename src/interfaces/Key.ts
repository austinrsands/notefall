import KeyType from '../enums/KeyType';
import Note from '../types/Note';
import CornerRadii from './CornerRadii';
import Position from './Position';
import Size from './Size';

interface Key {
  note: Note;
  type: KeyType;
  position: Position;
  size: Size;
  cornerRadii: CornerRadii;
}

export default Key;
