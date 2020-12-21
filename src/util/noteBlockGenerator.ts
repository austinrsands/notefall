import { Midi } from '@tonejs/midi';
import Key from '../interfaces/Key';
import NoteBlock from '../interfaces/NoteBlock';
import Hand from '../types/Hand';

const generateNoteBlocks = (song: Midi, keys: Key[]) => {
  const noteBlocks: NoteBlock[] = [];

  // Extract piano tracks
  const tracks = song.tracks.filter(
    (track) => track.instrument.family.toLowerCase() === 'piano',
  );

  // Loop through tracks
  tracks.forEach((track) => {
    // Determine hand of track, if possible
    let hand: Hand | undefined;
    if (track.name.toLowerCase().includes('left')) hand = 'left';
    if (track.name.toLowerCase().includes('right')) hand = 'right';

    // Loop through notes
    track.notes.forEach((note) => {
      noteBlocks.push({
        note: note.midi,
        hand,
        relativePosition: { x: 0, y: 0 },
        scale: { width: 0, height: 0 },
        cornerRadii: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
      });
    });
  });
};

export default generateNoteBlocks;
