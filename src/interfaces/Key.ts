import KeyType from '../enums/KeyType';
import Note from '../types/Note';
import CornerRadii from './CornerRadii';
import Position from './Position';
import Scale from './Scale';

interface Key {
  note: Note;
  type: KeyType;
  position: Position;
  scale: Scale;
  cornerRadii: CornerRadii;
}

export default Key;
