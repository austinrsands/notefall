import React from 'react';
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { useGameContext } from '../../game-context/context';
import { GameMode } from '../../game-context/structures';

const GameModeSelect: React.FC<TextFieldProps> = (props) => {
  const { gameState, gameDispatch } = useGameContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    gameDispatch({
      type: 'update-mode',
      mode: event.target.value as GameMode,
    });
  };

  return (
    <TextField
      fullWidth
      select
      value={gameState.mode}
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
