import Key from '../interfaces/Key';
import drawKey from './keys';

const drawKeyboard = (
  context: CanvasRenderingContext2D,
  keys: Key[],
  notes: number[],
) => {
  keys.forEach((key: Key) => {
    const isPressed = notes.includes(key.note);
    drawKey(context, key, isPressed);
  });
};

export default drawKeyboard;
