import { KEY_PALETTE } from '../constants/keyboard';
import Key from '../interfaces/Key';
import KeyState from '../enums/KeyState';
import drawRoundedRect from './roundedRect';

const drawKey = (
  context: CanvasRenderingContext2D,
  key: Key,
  state: KeyState,
) => {
  context.fillStyle = KEY_PALETTE[key.type][state];
  drawRoundedRect(context, key.position, key.size, key.cornerRadii);
  context.fill();
};

const drawKeyboard = (
  context: CanvasRenderingContext2D,
  keys: Key[],
  notes: number[],
) => {
  keys.forEach((key) => {
    drawKey(
      context,
      key,
      notes.includes(key.note) ? KeyState.Pressed : KeyState.Unpressed,
    );
  });
};

export default drawKeyboard;
