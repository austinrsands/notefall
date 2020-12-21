import Key from '../interfaces/Key';
import { keyColor } from '../util/helpers';
import drawRoundedRect from './roundedRect';

const drawKey = (
  context: CanvasRenderingContext2D,
  key: Key,
  isPressed: boolean,
) => {
  context.fillStyle = keyColor(key, isPressed);
  drawRoundedRect(context, key.position, key.scale, key.cornerRadii);
  context.fill();
};

export default drawKey;
