import React, { ChangeEvent } from 'react';
import { Slider } from '@material-ui/core';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';
import { MAX_TEMPO, MIN_TEMPO } from '../piano/constants';

const TempoSlider: React.FC<StyleProps> = ({ className, style }) => {
  const { appState, appDispatch } = useAppContext();

  // Updates the tempo scale
  const handleTempoScaleChange = (
    _: ChangeEvent<{}>,
    value: number | number[],
  ) => {
    appDispatch({ type: 'update-tempo', tempo: value as number });
  };

  return (
    <Slider
      className={className}
      style={style}
      color="primary"
      valueLabelDisplay="off"
      value={appState.tempo}
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      onChange={handleTempoScaleChange}
    />
  );
};

export default TempoSlider;
