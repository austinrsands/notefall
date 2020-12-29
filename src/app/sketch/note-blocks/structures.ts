import {
  CornerRadii,
  InclusiveRange,
  Position,
  Size,
} from '../../../util/structures';
import { KeyType } from '../keyboard/structures';

export type Note = number;

export enum Hand {
  Left = 'left',
  Right = 'right',
  Unkown = 'unknown',
}

export enum NoteBlockState {
  Unplayed = 'unplayed',
  Played = 'played',
}

export interface NoteBlock {
  note: Note;
  type: KeyType;
  hand: Hand;
  position: Position;
  size: Size;
  cornerRadii: CornerRadii;
}

export interface NoteGroup {
  unitNoteBlockHeight: number;
  noteBlocks: NoteBlock[];
  range: InclusiveRange;
}
