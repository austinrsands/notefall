import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import GameMode from '../enums/GameMode';

interface Props {
  disabled?: boolean;
}

const GameModeSelect: React.FC<Props & StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  // Selects game mode
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    appDispatch({
      type: 'update-game-mode',
      mode: event.target.value as GameMode,
    });
  };

  return (
    <TextField
      fullWidth
      select
      value={appState.mode}
      onChange={handleChange}
      {...props}
    >
      {Object.values(GameMode).map((mode) => (
        <MenuItem key={mode} value={mode}>
          {mode}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GameModeSelect;
