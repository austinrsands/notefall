import { NOTE_BLOCK_PALETTE } from '../constants/noteBlocks';
import NoteBlockState from '../enums/NoteBlockState';
import NoteBlock from '../interfaces/NoteBlock';
import drawRoundedRect from './roundedRect';

const drawNoteBlock = (
  context: CanvasRenderingContext2D,
  noteBlock: NoteBlock,
  state: NoteBlockState,
  progress: number,
) => {
  context.fillStyle = NOTE_BLOCK_PALETTE[noteBlock.hand][noteBlock.type][state];
  drawRoundedRect(
    context,
    { x: noteBlock.position.x, y: noteBlock.position.y + progress },
    noteBlock.size,
    noteBlock.cornerRadii,
  );
  context.fill();
};

const drawNoteBlocks = (
  context: CanvasRenderingContext2D,
  noteBlocks: NoteBlock[],
  notes: number[],
  progress: number,
) => {
  noteBlocks.forEach((noteBlock) => {
    drawNoteBlock(
      context,
      noteBlock,
      notes.includes(noteBlock.note)
        ? NoteBlockState.Played
        : NoteBlockState.Unplayed,
      progress,
    );
  });
};

export default drawNoteBlocks;
