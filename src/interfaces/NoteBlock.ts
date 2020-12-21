import Hand from '../types/Hand';
import CornerRadii from './CornerRadii';
import Position from './Position';
import Scale from './Scale';

interface NoteBlock {
  note: number;
  hand?: Hand;
  relativePosition: Position;
  scale: Scale;
  cornerRadii: CornerRadii;
}

export default NoteBlock;
