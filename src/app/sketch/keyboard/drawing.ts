import { Note } from '../note-blocks/structures';
import { drawRoundedRect } from '../util/helpers';
import { KEY_PALETTE } from './constants';
import { Key, KeyState } from './structures';

const drawKey = (
  context: CanvasRenderingContext2D,
  key: Key,
  state: KeyState,
) => {
  context.fillStyle = KEY_PALETTE[key.type][state];
  drawRoundedRect(context, key.position, key.size, key.cornerRadii);
  context.fill();
};

export const drawKeyboard = (
  context: CanvasRenderingContext2D,
  keys: Key[],
  notes: Note[],
) => {
  keys.forEach((key) => {
    drawKey(
      context,
      key,
      notes.includes(key.note) ? KeyState.Pressed : KeyState.Unpressed,
    );
  });
};
