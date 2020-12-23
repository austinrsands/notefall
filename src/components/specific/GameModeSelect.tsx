import React from 'react';
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { useAppContext } from '../../contexts/AppContext';
import GameMode from '../../enums/GameMode';

const GameModeSelect: React.FC<TextFieldProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

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
      value={appState.gameMode}
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
