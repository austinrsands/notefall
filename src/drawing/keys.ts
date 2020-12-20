import {
  DEFAULT_WHITE_KEY_COLOR,
  DEFAULT_BLACK_KEY_COLOR,
} from '../constants/colors';
import {
  BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
  TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH,
} from '../constants/keys';
import Key from '../interfaces/Key';
import drawRoundedRect from './roundedRect';

const drawKey = (context: CanvasRenderingContext2D, key: Key) => {
  const topCornerRadius =
    key.scale.width * TOP_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;
  const bottomCornerRadius =
    key.scale.width * BOTTOM_CORNER_RADIUS_TO_WHITE_KEY_WIDTH;
  context.fillStyle = key.isNatural
    ? DEFAULT_WHITE_KEY_COLOR
    : DEFAULT_BLACK_KEY_COLOR;
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
