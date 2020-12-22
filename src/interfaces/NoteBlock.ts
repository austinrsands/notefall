import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';
import Note from '../types/Note';
import CornerRadii from './CornerRadii';
import Position from './Position';
import Size from './Size';

interface NoteBlock {
  note: Note;
  type: KeyType;
  hand: Hand;
  offset: Position;
  size: Size;
  cornerRadii: CornerRadii;
}

export default NoteBlock;
