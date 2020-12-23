import React from 'react';
import { IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StyleProps from '../../interfaces/StyleProps';
import { useAppContext } from '../../contexts/AppContext';

interface Props {
  disabled?: boolean;
}

const PlayPauseButton: React.FC<Props & StyleProps> = ({
  disabled,
  ...rest
}) => {
  const { appState, appDispatch } = useAppContext();

  const handleClick = () => {
    if (appState.isPaused) appDispatch({ type: 'play' });
    else appDispatch({ type: 'pause' });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {appState.isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
