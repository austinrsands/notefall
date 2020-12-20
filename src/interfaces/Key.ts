import CornerRadii from './CornerRadii';
import Position from './Position';
import Scale from './Scale';

interface Key {
  note: number;
  isNatural: boolean;
  position: Position;
  scale: Scale;
  cornerRadii: CornerRadii;
}

export default Key;
