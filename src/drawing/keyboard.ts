import { KeyboardSize } from '../constants/keyboard';
import { compareKeys, generateKeys } from '../util/helpers';
import drawKey from './keys';

const drawKeyboard = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  keyboardSize: KeyboardSize,
  notes: number[],
) => {
  // Sort keys so that black keys get drawn on top
  const keys = generateKeys(width, height, keyboardSize).sort(compareKeys);
  keys.forEach((key) => {
    const isPressed = notes.includes(key.note);
    drawKey(context, key, isPressed);
  });
};

export default drawKeyboard;
