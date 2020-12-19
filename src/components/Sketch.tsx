import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { StyleProps } from '../styles/style';
import Canvas from './Canvas';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();

  // Gets called every frame
  const draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    // TODO: Draw background
    // TODO: Draw Notes
    // TODO: Draw Keyboard

    // context.clearRect(0, 0, width, height);
    context.beginPath();
    context.rect(Math.random() * width, Math.random() * height, 10, 10);
    context.fill();
  };

  return (
    <Canvas
      className={clsx(classes.root, className)}
      style={style}
      draw={draw}
      targetFramerate={10}
    />
  );
};

export default Sketch;
