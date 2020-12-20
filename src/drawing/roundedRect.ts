import CornerRadii from '../interfaces/CornerRadii';

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  cornerRadii: CornerRadii,
) => {
  let { topLeft, topRight, bottomRight, bottomLeft } = cornerRadii;

  // Clamp radius
  topLeft = Math.min(topLeft, w / 2, h / 2);
  topRight = Math.min(topRight, w / 2, h / 2);
  bottomRight = Math.min(bottomRight, w / 2, h / 2);
  bottomLeft = Math.min(bottomLeft, w / 2, h / 2);

  // Draw shape
  context.beginPath();
  context.moveTo(x + topLeft, y);
  context.arcTo(x + w, y, x + w, y + h, topRight);
  context.arcTo(x + w, y + h, x, y + h, bottomRight);
  context.arcTo(x, y + h, x, y, bottomLeft);
  context.arcTo(x, y, x + w, y, topLeft);
};

export default drawRoundedRect;
