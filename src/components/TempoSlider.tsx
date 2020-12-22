import React, { ChangeEvent } from 'react';
import { makeStyles, Slider } from '@material-ui/core';
import clsx from 'clsx';
import { useAppContext } from '../contexts/AppContext';
import StyleProps from '../interfaces/StyleProps';
import { MIN_TEMPO, MAX_TEMPO } from '../constants/options';

const useStyles = makeStyles({
  root: {
    padding: '0.2rem 0',
  },
});

const TempoSlider: React.FC<StyleProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState, appDispatch } = useAppContext();

  // Updates the tempo
  const handleTempoChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    appDispatch({ type: 'update-tempo', tempo: value as number });
  };

  return (
    <Slider
      className={clsx(classes.root, className)}
      color="primary"
      valueLabelDisplay="off"
      value={appState.tempo}
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      onChange={handleTempoChange}
      {...rest}
    />
  );
};

export default TempoSlider;
