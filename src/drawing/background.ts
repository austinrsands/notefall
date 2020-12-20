import { BACKGROUND_COLOR } from '../constants/colors';

const drawBackground = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, width, height);
};

export default drawBackground;
