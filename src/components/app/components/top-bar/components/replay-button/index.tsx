import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { useGameContext } from '../../../../contexts/game-context';
import { StyleProps } from '../../../../../../util/structures';

const ReplayButton: React.FC<StyleProps> = (props) => {
  const { gameState, gameDispatch } = useGameContext();

  const handleClick = () => {
    gameDispatch({ type: 'restart' });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label="replay"
      disabled={gameState.song === undefined}
      {...props}
    >
      <ReplayRoundedIcon />
    </IconButton>
  );
};

export default ReplayButton;
