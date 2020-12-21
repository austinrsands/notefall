import CornerRadii from '../interfaces/CornerRadii';
import Position from '../interfaces/Position';
import Scale from '../interfaces/Scale';

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  position: Position,
  scale: Scale,
  cornerRadii: CornerRadii,
) => {
  let { topLeft, topRight, bottomRight, bottomLeft } = cornerRadii;

  // Clamp radius
  topLeft = Math.min(topLeft, scale.width / 2, scale.height / 2);
  topRight = Math.min(topRight, scale.width / 2, scale.height / 2);
  bottomRight = Math.min(bottomRight, scale.width / 2, scale.height / 2);
  bottomLeft = Math.min(bottomLeft, scale.width / 2, scale.height / 2);

  // Draw shape
  context.beginPath();
  context.moveTo(position.x + topLeft, position.y);
  context.arcTo(
    position.x + scale.width,
    position.y,
    position.x + scale.width,
    position.y + scale.height,
    topRight,
  );
  context.arcTo(
    position.x + scale.width,
    position.y + scale.height,
    position.x,
    position.y + scale.height,
    bottomRight,
  );
  context.arcTo(
    position.x,
    position.y + scale.height,
    position.x,
    position.y,
    bottomLeft,
  );
  context.arcTo(
    position.x,
    position.y,
    position.x + scale.width,
    position.y,
    topLeft,
  );
};

export default drawRoundedRect;
