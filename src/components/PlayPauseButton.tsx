import React, { useState } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';
import { DEFAULT_APP_STATE } from '../reducers/appReducer';

interface Props {
  disabled?: boolean;
}

const PlayPauseButton: React.FC<Props & StyleProps> = ({
  className,
  style,
  disabled,
}) => {
  const [isPaused, setIsPaused] = useState(DEFAULT_APP_STATE.isPaused);
  const { appDispatch } = useAppContext();

  // Plays or pauses
  const handleClick = () => {
    if (isPaused) appDispatch({ type: 'play' });
    else appDispatch({ type: 'pause' });
    setIsPaused((prev) => !prev);
  };

  return (
    <Tooltip
      className={className}
      style={style}
      title={isPaused ? 'Play song' : 'Pause song'}
      enterDelay={500}
    >
      <IconButton size="medium" onClick={handleClick} disabled={disabled}>
        {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default PlayPauseButton;
