import KeyType from '../enums/KeyType';
import KeyState from '../enums/KeyState';

type KeyPalette = Record<KeyType, Record<KeyState, string>>;
export default KeyPalette;
