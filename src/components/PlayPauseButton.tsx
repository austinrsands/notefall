import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';

interface Props {
  disabled?: boolean;
}

const PlayPauseButton: React.FC<Props & StyleProps> = ({
  disabled,
  ...rest
}) => {
  const { appState, appDispatch } = useAppContext();

  // Plays or pauses
  const handleClick = () => {
    if (appState.isPaused) appDispatch({ type: 'play' });
    else appDispatch({ type: 'pause' });
  };

  return (
    <Tooltip
      title={appState.isPaused ? 'Play song' : 'Pause song'}
      enterDelay={500}
      {...rest}
    >
      <IconButton size="medium" onClick={handleClick} disabled={disabled}>
        {appState.isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default PlayPauseButton;
