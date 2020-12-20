import {
  BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
  TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
} from '../constants/keys';
import Key from '../interfaces/Key';
import { keyColor } from '../util/helpers';
import drawRoundedRect from './roundedRect';

const drawKey = (
  context: CanvasRenderingContext2D,
  key: Key,
  isPressed: boolean,
) => {
  // Calculate corner radii
  const topCornerRadius =
    key.scale.width * TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;
  const bottomCornerRadius =
    key.scale.width * BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;

  // Draw key
  context.fillStyle = keyColor(key, isPressed);
  drawRoundedRect(
    context,
    key.position.x,
    key.position.y,
    key.scale.width,
    key.scale.height,
    topCornerRadius,
    topCornerRadius,
    bottomCornerRadius,
    bottomCornerRadius,
  );
  context.fill();
};

export default drawKey;
