import InclusiveRange from './InclusiveRange';
import NoteBlock from './NoteBlock';

interface NoteGroup {
  unitNoteBlockLength: number;
  noteBlocks: NoteBlock[];
  range: InclusiveRange;
}

export default NoteGroup;
