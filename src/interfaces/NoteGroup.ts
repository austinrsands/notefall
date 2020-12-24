import InclusiveRange from './InclusiveRange';
import NoteBlock from './NoteBlock';

interface NoteGroup {
  unitNoteBlockHeight: number;
  noteBlocks: NoteBlock[];
  range: InclusiveRange;
}

export default NoteGroup;
