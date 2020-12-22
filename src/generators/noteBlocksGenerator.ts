import { Midi } from '@tonejs/midi';
import NoteBlock from '../interfaces/NoteBlock';
import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';
import {
  NOTE_BLOCK_CORNER_RADIUS_TO_WIDTH_RATIO,
  UNIT_NOTE_BLOCK_LENGTH_TO_KEYBOARD_HEIGHT_RATIO,
} from '../constants/noteBlocks';
import Keyboard from '../interfaces/Keyboard';

// Used to separate black key note blocks from white
const compareNoteBlocks = (a: NoteBlock, b: NoteBlock) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.Black && b.type === KeyType.White) return 1;
  return 0;
};

const generateNoteBlocks = (song: Midi, keyboard: Keyboard): NoteBlock[] => {
  // Initialize array
  const noteBlocks: NoteBlock[] = [];

  // Determine how many pixels correspond to a second of note duration
  const unitLength =
    UNIT_NOTE_BLOCK_LENGTH_TO_KEYBOARD_HEIGHT_RATIO * keyboard.size.height;

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

export default generateNoteBlocks;
