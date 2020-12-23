import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import drawBackground from '../drawing/background';
import drawKeyboard from '../drawing/keyboard';
import Size from '../interfaces/Size';
import Canvas from './Canvas';
import NoteBlock from '../interfaces/NoteBlock';
import generateNoteBlocks from '../generators/noteBlocksGenerator';
import drawNoteBlocks from '../drawing/noteBlocks';
import Keyboard from '../interfaces/Keyboard';
import generateKeyboard from '../generators/keyboardGenerator';
import { NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO } from '../constants/noteBlocks';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<StyleProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState, appDispatch } = useAppContext();
  const [size, setSize] = useState<Size | undefined>();

  const keyboard: Keyboard | null = useMemo(() => {
    if (size)
      return generateKeyboard(size, appState.keyboardType, appState.transpose);
    return null;
  }, [appState.keyboardType, appState.transpose, size]);

  const noteBlocks: NoteBlock[] | null = useMemo(() => {
    if (appState.song && keyboard)
      return generateNoteBlocks(appState.song, keyboard);
    return null;
  }, [appState.song, keyboard]);

  // Regenerates keys when necessary
  const handleResize = useCallback((canvasSize: Size) => {
    setSize(canvasSize);
  }, []);

  // Gets called every frame
  const handleDraw = useCallback(
    (context: CanvasRenderingContext2D) => {
      // Draw background
      if (size) drawBackground(context, size);

      // Draw note blocks
      if (noteBlocks) {
        drawNoteBlocks(context, noteBlocks, appState.notes, appState.progress);
      }

      // Draw keyboard
      if (keyboard) drawKeyboard(context, keyboard.keys, appState.notes);
    },
    [appState.notes, appState.progress, keyboard, noteBlocks, size],
  );

  // Moves note blocks on scroll
  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      if (keyboard && noteBlocks) {
        // Determine amount to increment progess
        const amount =
          Math.sign(event.deltaY) *
          keyboard.size.height *
          NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO;
        appDispatch({ type: 'increment-progress', amount });
      }
    },
    [appDispatch, keyboard, noteBlocks],
  );

  return (
    <Canvas
      className={clsx(classes.root, className)}
      onDraw={handleDraw}
      onResize={handleResize}
      onWheel={handleWheel}
      onSetup={() => undefined} // Test
      targetFramerate={1} // Test
      {...rest}
    />
  );
};

export default Sketch;
