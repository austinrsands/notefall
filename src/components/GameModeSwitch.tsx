import React from 'react';
import { Switch } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import GameMode from '../enums/GameMode';

const GameModeSwitch: React.FC<StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  // Updates game mode
  const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked)
      appDispatch({ type: 'update-game-mode', mode: GameMode.WaitForKey });
    else appDispatch({ type: 'update-game-mode', mode: GameMode.Continuous });
  };

  return (
    <Switch
      checked={appState.mode === GameMode.WaitForKey}
      color="primary"
      size="medium"
      onChange={handleGameModeChange}
      {...props}
    />
  );
};

export default GameModeSwitch;
