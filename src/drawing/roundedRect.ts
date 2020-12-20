const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r0: number, // Top left
  r1: number, // Top right
  r2: number, // Bottom right
  r3: number, // Bottom left
) => {
  // Clamp radius
  r0 = Math.min(r0, w / 2, h / 2);
  r1 = Math.min(r1, w / 2, h / 2);
  r2 = Math.min(r2, w / 2, h / 2);
  r3 = Math.min(r3, w / 2, h / 2);

  // Draw shape
  context.beginPath();
  context.moveTo(x + r0, y);
  context.arcTo(x + w, y, x + w, y + h, r1);
  context.arcTo(x + w, y + h, x, y + h, r2);
  context.arcTo(x, y + h, x, y, r3);
  context.arcTo(x, y, x + w, y, r0);
};

export default drawRoundedRect;
