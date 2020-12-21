import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import drawBackground from '../drawing/background';
import drawKeyboard from '../drawing/keyboard';
import Key from '../interfaces/Key';
import generateKeys from '../util/keyGenerator';
import Scale from '../interfaces/Scale';
import Canvas from './Canvas';

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
  const [scale, setScale] = useState<Scale>({ width: 0, height: 0 });

  const keys: Key[] = useMemo(
    () => generateKeys(scale, appState.keyboardSize, appState.transpose),
    [appState.keyboardSize, appState.transpose, scale],
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
      // TODO: Draw Notes
      drawKeyboard(context, keys, appState.notes);
    },
    [appState.notes, keys],
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
