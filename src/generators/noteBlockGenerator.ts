import { Midi } from '@tonejs/midi';
import Key from '../interfaces/Key';
import NoteBlock from '../interfaces/NoteBlock';
import Hand from '../enums/Hand';
import KeyType from '../enums/KeyType';

// Used to separate black key note blocks from white
const compareNoteBlocks = (a: NoteBlock, b: NoteBlock) => {
  if (a.type === KeyType.White && b.type === KeyType.Black) return -1;
  if (a.type === KeyType.Black && b.type === KeyType.White) return 1;
  return 0;
};

const generateNoteBlocks = (song: Midi, keys: Key[]) => {
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
      const correspondingKey = keys.find((key) => key.note === note.midi);

      // Only create note block if corresponding key exists
      if (correspondingKey) {
        noteBlocks.push({
          note: note.midi,
          type: correspondingKey.type,
          hand,
          relativePosition: {
            x: correspondingKey.position.x,
            y: correspondingKey.position.y - 300,
          },
          scale: { width: correspondingKey.scale.width, height: 300 },
          cornerRadii: {
            topLeft: correspondingKey.cornerRadii.topLeft,
            topRight: correspondingKey.cornerRadii.topRight,
            bottomRight: correspondingKey.cornerRadii.topRight,
            bottomLeft: correspondingKey.cornerRadii.topLeft,
          },
        });
      }
    });
  });
  return noteBlocks.sort(compareNoteBlocks);
};

export default generateNoteBlocks;
