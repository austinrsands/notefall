import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import drawBackground from '../drawing/background';
import drawKeyboard from '../drawing/keyboard';
import Key from '../interfaces/Key';
import generateKeys from '../generators/keyGenerator';
import Scale from '../interfaces/Scale';
import Canvas from './Canvas';
import NoteBlock from '../interfaces/NoteBlock';
import generateNoteBlocks from '../generators/noteBlockGenerator';
import drawNoteBlocks from '../drawing/noteBlocks';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<StyleProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState } = useAppContext();
  const [scale, setScale] = useState<Scale | undefined>();

  // Array of keys
  const keys: Key[] = useMemo(
    () =>
      scale
        ? generateKeys(scale, appState.keyboardSize, appState.transpose)
        : [],
    [appState.keyboardSize, appState.transpose, scale],
  );

  // Array of note blocks
  const noteBlocks: NoteBlock[] = useMemo(
    () => (appState.song ? generateNoteBlocks(appState.song, keys) : []),
    [appState.song, keys],
  );

  // Regenerates keys when necessary
  const handleResize = useCallback((canvasScale: Scale) => {
    setScale(canvasScale);
  }, []);

  // Gets called every frame
  const handleDraw = useCallback(
    (context: CanvasRenderingContext2D) => {
      const { width, height } = context.canvas.getBoundingClientRect();
      drawBackground(context, { width, height });
      // TODO: Draw Octave Lines
      drawNoteBlocks(context, noteBlocks, appState.notes); // not showing
      drawKeyboard(context, keys, appState.notes);
    },
    [appState.notes, keys, noteBlocks],
  );

  return (
    <Canvas
      className={clsx(classes.root, className)}
      onDraw={handleDraw}
      onResize={handleResize}
      {...rest}
    />
  );
};

export default Sketch;
