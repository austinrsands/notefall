import { Keyboard } from '../keyboard/structures';
import { drawRoundedRect } from '../util/helpers';
import { NOTE_BLOCK_PALETTE } from './constants';
import { noteBlockIsVisible, getNoteBlockState } from './helpers';
import { NoteBlock, NoteBlockState, Note } from './structures';

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

export const drawNoteBlocks = (
  context: CanvasRenderingContext2D,
  noteBlocks: NoteBlock[],
  notes: Note[],
  progress: number,
  keyboard: Keyboard,
) => {
  noteBlocks.forEach((noteBlock) => {
    if (noteBlockIsVisible(noteBlock, progress, keyboard))
      drawNoteBlock(
        context,
        noteBlock,
        getNoteBlockState(noteBlock, notes, progress, keyboard),
        progress,
      );
  });
};
