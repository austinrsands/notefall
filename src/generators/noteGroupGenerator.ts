import { Midi } from '@tonejs/midi';
import NoteBlock from '../interfaces/NoteBlock';
import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';
import {
  NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO,
  UNIT_NOTE_BLOCK_LENGTH_TO_KEYBOARD_HEIGHT_RATIO,
} from '../constants/noteBlocks';
import Keyboard from '../interfaces/Keyboard';
import NoteGroup from '../interfaces/NoteGroup';
import InclusiveRange from '../interfaces/InclusiveRange';

// Used to separate black key note blocks from white
const compareNoteBlocks = (a: NoteBlock, b: NoteBlock) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.Black && b.type === KeyType.White) return 1;
  return 0;
};

const getFirstNoteBlock = (noteBlocks: NoteBlock[]) =>
  noteBlocks.reduce((prev, current) =>
    prev.position.y + prev.size.height >
    current.position.y + current.size.height
      ? prev
      : current,
  );

const getLastNoteBlock = (noteBlocks: NoteBlock[]) =>
  noteBlocks.reduce((prev, current) =>
    prev.position.y < current.position.y ? prev : current,
  );

const generateRange = (
  noteBlocks: NoteBlock[],
  keyboard: Keyboard,
): InclusiveRange => {
  const firstNoteBlock = getFirstNoteBlock(noteBlocks);
  const lastNoteBlock = getLastNoteBlock(noteBlocks);
  const min = -(firstNoteBlock.position.y + firstNoteBlock.size.height);
  const max = -(lastNoteBlock.position.y - keyboard.position.y);
  return { min, max };
};

const generateNoteBlocks = (
  song: Midi,
  keyboard: Keyboard,
  unitLength: number,
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
        const height = note.duration * unitLength;

        // Determine offset from top of screen where the notes will start
        const initialOffset = keyboard.position.y - unitLength;

        // Determine offset relative to start
        const relativeOffset = note.time * unitLength + height;

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

const generateNoteGroup = (song: Midi, keyboard: Keyboard): NoteGroup => {
  // Determine how many pixels correspond to a second of duration
  const unitNoteBlockLength =
    UNIT_NOTE_BLOCK_LENGTH_TO_KEYBOARD_HEIGHT_RATIO * keyboard.size.height;

  // Generate note blocks
  const noteBlocks = generateNoteBlocks(song, keyboard, unitNoteBlockLength);

  // Determine valid range for progress
  const range = generateRange(noteBlocks, keyboard);

  return {
    unitNoteBlockLength,
    noteBlocks,
    range,
  };
};

export default generateNoteGroup;