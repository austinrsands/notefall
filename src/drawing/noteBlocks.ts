import { NOTE_BLOCK_PALETTE } from '../constants/noteBlocks';
import NoteBlockState from '../enums/NoteBlockState';
import NoteBlock from '../interfaces/NoteBlock';
import drawRoundedRect from './roundedRect';

const drawNoteBlock = (
  context: CanvasRenderingContext2D,
  noteBlock: NoteBlock,
  state: NoteBlockState,
) => {
  context.fillStyle = NOTE_BLOCK_PALETTE[noteBlock.hand][noteBlock.type][state];
  drawRoundedRect(
    context,
    noteBlock.offset,
    noteBlock.size,
    noteBlock.cornerRadii,
  );
  context.fill();
};

const drawNoteBlocks = (
  context: CanvasRenderingContext2D,
  noteBlocks: NoteBlock[],
  notes: number[],
) => {
  noteBlocks.forEach((noteBlock) => {
    drawNoteBlock(
      context,
      noteBlock,
      notes.includes(noteBlock.note)
        ? NoteBlockState.Played
        : NoteBlockState.Unplayed,
    );
  });
};

export default drawNoteBlocks;
