import { Midi } from '@tonejs/midi';
import { InclusiveRange } from '../../util/structures';
import { KeyType, Keyboard } from '../keyboard/structures';
import {
  NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO,
  UNIT_NOTE_BLOCK_HEIGHT_TO_KEYBOARD_HEIGHT_RATIO,
} from './constants';
import { NoteBlock, Hand, NoteGroup } from './structures';

// Used to separate black key note blocks from white
const compareNoteBlocks = (a: NoteBlock, b: NoteBlock) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.Black && b.type === KeyType.White) return 1;
  return 0;
};

// Retrieves note block with the lowest bottom position
const getBottommostNoteBlock = (noteBlocks: NoteBlock[]) =>
  noteBlocks.reduce((prev, current) =>
    prev.position.y + prev.size.height >
    current.position.y + current.size.height
      ? prev
      : current,
  );

// Retrieves note block with the highest top position
const getTopMostNoteBlock = (noteBlocks: NoteBlock[]) =>
  noteBlocks.reduce((prev, current) =>
    prev.position.y < current.position.y ? prev : current,
  );

// Returns range of vertical position from the bottom of the bottommost note block to the top of the topmost note block
const generateRange = (
  noteBlocks: NoteBlock[],
  keyboard: Keyboard,
): InclusiveRange => {
  const firstNoteBlock = getBottommostNoteBlock(noteBlocks);
  const lastNoteBlock = getTopMostNoteBlock(noteBlocks);
  const min = -(firstNoteBlock.position.y + firstNoteBlock.size.height);
  const max = -(
    lastNoteBlock.position.y -
    keyboard.position.y -
    keyboard.size.height
  );
  return { min, max };
};

const generateNoteBlocks = (
  song: Midi,
  keyboard: Keyboard,
  unitHeight: number,
): NoteBlock[] => {
  // Initialize array
  const noteBlocks: NoteBlock[] = [];

  // Extract piano tracks
  const tracks = song.tracks.filter(
    (track) => track.instrument.family.toLowerCase() === 'piano',
  );

  // Loop through tracks
  tracks.forEach((track) => {
    // Determine hand of track, if possible
    let hand: Hand = Hand.Unkown;
    if (track.name.toLowerCase().includes('left')) hand = Hand.Left;
    if (track.name.toLowerCase().includes('right')) hand = Hand.Left;

    // Loop through notes
    track.notes.forEach((note) => {
      // Find corresponding key, if it exists
      const correspondingKey = keyboard.keys.find(
        (key) => key.note === note.midi,
      );

      // Only create note block if corresponding key exists
      if (correspondingKey) {
        // Determine corner radius
        const cornerRadius =
          correspondingKey.size.width * NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO;

        // Determine height
        const height = note.duration * unitHeight;

        // Determine offset from top of screen where the notes will start
        const initialOffset = keyboard.position.y - unitHeight * 3;

        // Determine offset relative to start
        const relativeOffset = note.time * unitHeight + height;

        // Push note block to array
        noteBlocks.push({
          note: note.midi,
          type: correspondingKey.type,
          hand,
          position: {
            x: correspondingKey.position.x,
            y: -relativeOffset + initialOffset,
          },
          size: { width: correspondingKey.size.width, height },
          cornerRadii: {
            topLeft: cornerRadius,
            topRight: cornerRadius,
            bottomRight: cornerRadius,
            bottomLeft: cornerRadius,
          },
        });
      }
    });
  });
  return noteBlocks.sort(compareNoteBlocks);
};

export const generateNoteGroup = (
  song: Midi,
  keyboard: Keyboard,
): NoteGroup => {
  // Determine how many pixels correspond to a second of duration
  const unitNoteBlockHeight =
    UNIT_NOTE_BLOCK_HEIGHT_TO_KEYBOARD_HEIGHT_RATIO * keyboard.size.height;

  // Generate note blocks
  const noteBlocks = generateNoteBlocks(song, keyboard, unitNoteBlockHeight);

  // Determine valid range for progress
  const range = generateRange(noteBlocks, keyboard);

  return {
    unitNoteBlockHeight,
    noteBlocks,
    range,
  };
};
