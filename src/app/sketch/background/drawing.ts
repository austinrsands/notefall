import { grey } from '@material-ui/core/colors';
import { Size } from '../../util/structures';

// Colors
const BACKGROUND_COLOR = grey[900];

export const drawBackground = (
  context: CanvasRenderingContext2D,
  size: Size,
) => {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, size.width, size.height);
};
