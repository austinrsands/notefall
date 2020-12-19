import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
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

  const setup = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.rect(width / 2, height / 2, 10, 10);
    context.fill();
  };

  const draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    // context.clearRect(0, 0, width, height);
    context.beginPath();
    context.rect(Math.random() * width, Math.random() * height, 10, 10);
    context.fill();
  };

  return (
    <Canvas
      className={clsx(classes.root, className)}
      style={style}
      setup={setup}
      draw={draw}
      targetFramerate={100}
    />
  );
};

export default Sketch;
