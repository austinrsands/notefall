import { BACKGROUND_COLOR } from '../constants/colors';
import Scale from '../interfaces/Scale';

const drawBackground = (context: CanvasRenderingContext2D, scale: Scale) => {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, scale.width, scale.height);
};

export default drawBackground;
