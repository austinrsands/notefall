import React from 'react';
import { IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { useGameContext } from '../../game-context/context';
import { StyleProps } from '../../util/structures';

const PlayPauseButton: React.FC<StyleProps> = (props) => {
  const { gameState, gameDispatch } = useGameContext();

  const handleClick = () => {
    gameDispatch({
      type: gameState.isPlaying ? 'pause' : 'play',
    });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label={gameState.isPlaying ? 'pause' : 'play'}
      disabled={gameState.song === undefined}
      {...props}
    >
      {gameState.isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
