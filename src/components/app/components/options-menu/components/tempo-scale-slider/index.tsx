import React, { ChangeEvent } from 'react';
import { makeStyles, Slider, SliderProps } from '@material-ui/core';
import clsx from 'clsx';
import { useGameContext } from '../../../../contexts/game-context';
import {
  MIN_TEMPO_SCALE,
  MAX_TEMPO_SCALE,
  TEMPO_SCALE_STEP,
} from '../../constants';

const useStyles = makeStyles({
  root: {
    padding: '0.2rem 0',
  },
});

const TempoScaleSlider: React.FC<SliderProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { gameState, gameDispatch } = useGameContext();

  const handleTempoChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    gameDispatch({ type: 'update-tempo-scale', scale: value as number });
  };

  return (
    <Slider
      className={clsx(classes.root, className)}
      color="primary"
      valueLabelDisplay="off"
      marks
      value={gameState.tempoScale}
      min={MIN_TEMPO_SCALE}
      max={MAX_TEMPO_SCALE}
      step={TEMPO_SCALE_STEP}
      onChange={handleTempoChange}
      {...rest}
    />
  );
};

export default TempoScaleSlider;
