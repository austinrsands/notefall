import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import Canvas from './Canvas';
import { useAppContext } from '../contexts/AppContext';
import drawBackground from '../drawing/background';
import drawKeyboard from '../drawing/keyboard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();
  const { appState } = useAppContext();

  // Gets called every frame
  const draw = useCallback(
    (context: CanvasRenderingContext2D) => {
      const { width, height } = context.canvas.getBoundingClientRect();
      drawBackground(context, width, height);
      // TODO: Draw Octave Lines
      // TODO: Draw Notes
      drawKeyboard(
        context,
        width,
        height,
        appState.keyboardSize,
        appState.notes,
      );
    },
    [appState.keyboardSize, appState.notes],
  );

  return (
    <Canvas
      className={clsx(classes.root, className)}
      style={style}
      draw={draw}
    />
  );
};

export default Sketch;
