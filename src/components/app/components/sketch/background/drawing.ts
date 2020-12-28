import { Size } from '../../../../../util/structures';
import { BACKGROUND_COLOR } from './constants';

export const drawBackground = (
  context: CanvasRenderingContext2D,
  size: Size,
) => {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, size.width, size.height);
};
