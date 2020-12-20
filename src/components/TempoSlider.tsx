import React, { ChangeEvent } from 'react';
import { Slider } from '@material-ui/core';
import { useAppContext } from '../contexts/AppContext';
import { MAX_TEMPO, MIN_TEMPO } from '../constants/tempo';
import StyleProps from '../interfaces/StyleProps';

const TempoSlider: React.FC<StyleProps> = (props) => {
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
      color="primary"
      valueLabelDisplay="off"
      value={appState.tempo}
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      onChange={handleTempoScaleChange}
      {...props}
    />
  );
};

export default TempoSlider;
