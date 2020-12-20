import { KeyboardSize } from '../constants/keyboard';
import { compareKeys, generateKeys } from '../util/helpers';
import drawKey from './keys';

const drawKeyboard = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  keyboardSize: KeyboardSize,
) => {
  // Sort keys so that black keys get drawn on top
  const keys = generateKeys(width, height, keyboardSize).sort(compareKeys);
  keys.forEach((key) => {
    drawKey(context, key);
  });
};

export default drawKeyboard;
