import { KeyboardSize } from '../constants/keyboard';
import Key from '../interfaces/Key';
import { compareKeys, generateKeys } from '../util/helpers';
import drawKey from './keys';

const drawKeyboard = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  keyboardSize: KeyboardSize,
  transpose: number,
  notes: number[],
) => {
  // Sort keys so that black keys get drawn on top
  const keys = generateKeys(width, height, keyboardSize, transpose).sort(
    compareKeys,
  );
  keys.forEach((key: Key) => {
    const isPressed = notes.includes(key.note);
    drawKey(context, key, isPressed);
  });
};

export default drawKeyboard;
