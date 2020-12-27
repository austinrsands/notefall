import { Size, Position, CornerRadii } from '../../util/structures';

export const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  position: Position,
  size: Size,
  cornerRadii: CornerRadii,
) => {
  let { topLeft, topRight, bottomRight, bottomLeft } = cornerRadii;

  // Clamp radius
  topLeft = Math.min(topLeft, size.width / 2, size.height / 2);
  topRight = Math.min(topRight, size.width / 2, size.height / 2);
  bottomRight = Math.min(bottomRight, size.width / 2, size.height / 2);
  bottomLeft = Math.min(bottomLeft, size.width / 2, size.height / 2);

  // Draw shape
  context.beginPath();
  context.moveTo(position.x + topLeft, position.y);
  context.arcTo(
    position.x + size.width,
    position.y,
    position.x + size.width,
    position.y + size.height,
    topRight,
  );
  context.arcTo(
    position.x + size.width,
    position.y + size.height,
    position.x,
    position.y + size.height,
    bottomRight,
  );
  context.arcTo(
    position.x,
    position.y + size.height,
    position.x,
    position.y,
    bottomLeft,
  );
  context.arcTo(
    position.x,
    position.y,
    position.x + size.width,
    position.y,
    topLeft,
  );
};
