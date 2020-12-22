import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';
import Note from '../types/Note';
import CornerRadii from './CornerRadii';
import Position from './Position';
import Scale from './Scale';

interface NoteBlock {
  note: Note;
  type: KeyType;
  hand: Hand;
  relativePosition: Position;
  scale: Scale;
  cornerRadii: CornerRadii;
}

export default NoteBlock;
