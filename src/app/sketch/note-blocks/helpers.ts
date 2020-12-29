import { InclusiveRange } from '../../../util/structures';
import { Keyboard } from '../keyboard/structures';
import { NOTE_BLOCK_TOLERANCE_FACTOR } from './constants';
import { Note, NoteBlock, NoteBlockState } from './structures';

const isInRange = (value: number, range: InclusiveRange) =>
  value <= range.max && value >= range.min;

export const noteBlockIsVisible = (
  noteBlock: NoteBlock,
  progress: number,
  keyboard: Keyboard,
) => {
  const top = noteBlock.position.y + progress;
  const bottom = top + noteBlock.size.height;
  const visibleRange: InclusiveRange = {
    min: 0,
    max: keyboard.position.y + keyboard.size.height,
  };
  return isInRange(top, visibleRange) || isInRange(bottom, visibleRange);
};

const noteIsPlayed = (note: Note, notes: Note[]) => notes.includes(note);

const noteBlockIsPlayable = (
  noteBlock: NoteBlock,
  progress: number,
  keyboard: Keyboard,
) => {
  const top = noteBlock.position.y + progress;
  const bottom = top + noteBlock.size.height;
  return keyboard.position.y >= top && keyboard.position.y <= bottom;
};

export const getNoteBlockState = (
  noteBlock: NoteBlock,
  notes: Note[],
  progress: number,
  keyboard: Keyboard,
) =>
  noteBlockIsPlayable(noteBlock, progress, keyboard) &&
  noteIsPlayed(noteBlock.note, notes)
    ? NoteBlockState.Played
    : NoteBlockState.Unplayed;

// Returns whether the given note block should be played
const noteBlockShouldBePlayed = (
  noteBlock: NoteBlock,
  progress: number,
  keyboard: Keyboard,
) => {
  // Determine actual position of top and bottom of note block
  const top = noteBlock.position.y + progress;
  const bottom = top + noteBlock.size.height;

  // Determine release tolerance so its small for small blocks and large for large blocks
  const releaseTolerance =
    noteBlock.size.height /
    Math.exp(NOTE_BLOCK_TOLERANCE_FACTOR * noteBlock.size.height);

  // Determine top with tolerance taken into account
  const toleratedTop = bottom - releaseTolerance;

  return keyboard.position.y >= toleratedTop && keyboard.position.y <= bottom;
};

// Determine if all notes that should be played are played
export const notesThatShouldBePlayedArePlayed = (
  noteBlocks: NoteBlock[],
  notes: Note[],
  progress: number,
  keyboard: Keyboard,
) => {
  // Determine all notes that should be played
  const notesThatShouldBePlayed = noteBlocks
    .filter((noteBlock) =>
      noteBlockShouldBePlayed(noteBlock, progress, keyboard),
    )
    .map((noteBlock) => noteBlock.note);

  // Return true if all notes that should be are played
  return notesThatShouldBePlayed.every((note) => notes.includes(note));
};
