import { BACKGROUND_COLOR } from '../constants/background';
import Size from '../interfaces/Size';

const drawBackground = (context: CanvasRenderingContext2D, size: Size) => {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, size.width, size.height);
};

export default drawBackground;
