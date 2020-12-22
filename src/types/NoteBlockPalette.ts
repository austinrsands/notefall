import Hand from '../enums/Hand';
import NoteBlockState from '../enums/NoteBlockState';
import KeyType from '../enums/KeyType';

type NoteBlockPalette = Record<
  Hand,
  Record<KeyType, Record<NoteBlockState, string>>
>;
export default NoteBlockPalette;
