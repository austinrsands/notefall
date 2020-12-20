import Position from './Position';
import Scale from './Scale';

interface Key {
  note: number;
  isNatural: boolean;
  position: Position;
  scale: Scale;
}

export default Key;
