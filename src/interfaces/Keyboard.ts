import Key from './Key';
import InclusiveRange from './InclusiveRange';
import Position from './Position';
import Size from './Size';

interface Keyboard {
  position: Position;
  size: Size;
  range: InclusiveRange;
  keys: Key[];
}

export default Keyboard;
