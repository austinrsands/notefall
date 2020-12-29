import React from 'react';
import { Switch, SwitchProps } from '@material-ui/core';
import { useGameContext } from '../../game-context';
import { GameMode } from '../../game-context/structures';

const GameModeSwitch: React.FC<SwitchProps> = (props) => {
  const { gameState, gameDispatch } = useGameContext();

  const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked)
      gameDispatch({ type: 'update-mode', mode: GameMode.WaitForKey });
    gameDispatch({
      type: 'update-mode',
      mode: event.target.checked ? GameMode.WaitForKey : GameMode.Continuous,
    });
  };

  return (
    <Switch
      checked={gameState.mode === GameMode.WaitForKey}
      color="primary"
      size="medium"
      onChange={handleGameModeChange}
      {...props}
    />
  );
};

export default GameModeSwitch;
