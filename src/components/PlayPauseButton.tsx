import React, { useState } from 'react';
import { Tooltip, Box, IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { StyleProps } from '../styles/style';

interface Props {
  onPlay?: () => void;
  onPause?: () => void;
  disabled?: boolean;
}

const PlayPauseButton: React.FC<Props & StyleProps> = ({
  className,
  style,
  onPlay,
  onPause,
  disabled,
}) => {
  const [isPaused, setIsPaused] = useState(true);

  const handleClick = () => {
    if (onPlay && isPaused) onPlay();
    else if (onPause) onPause();
    setIsPaused((prev) => !prev);
  };

  return (
    <Box className={className} style={style}>
      <Tooltip title={isPaused ? 'Play song' : 'Pause song'} enterDelay={500}>
        <IconButton size="medium" onClick={handleClick} disabled={disabled}>
          {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PlayPauseButton;
