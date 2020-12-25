import React from 'react';
import { IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StyleProps from '../../interfaces/StyleProps';
import { useAppContext } from '../../contexts/AppContext';
import GameState from '../../enums/GameState';

const PlayPauseButton: React.FC<StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  const handleClick = () => {
    if (appState.gameState === GameState.Paused) appDispatch({ type: 'play' });
    else appDispatch({ type: 'pause' });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label={appState.gameState === GameState.Paused ? 'play' : 'pause'}
      disabled={appState.song === undefined}
      {...props}
    >
      {appState.gameState === GameState.Paused ? (
        <PlayArrowRoundedIcon />
      ) : (
        <PauseRoundedIcon />
      )}
    </IconButton>
  );
};

export default PlayPauseButton;
