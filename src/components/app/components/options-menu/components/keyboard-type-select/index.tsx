import React from 'react';
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { useGameContext } from '../../../../contexts/game-context';
import { KeyboardType } from '../../../sketch/keyboard/structures';

const KeyboardTypeSelect: React.FC<TextFieldProps> = (props) => {
  const { gameState, gameDispatch } = useGameContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    gameDispatch({
      type: 'update-keyboard-type',
      keyboardType: event.target.value as KeyboardType,
    });
  };

  return (
    <TextField
      fullWidth
      select
      value={gameState.keyboardType}
      onChange={handleChange}
      {...props}
    >
      {Object.values(KeyboardType).map((keyboardSize) => (
        <MenuItem key={keyboardSize} value={keyboardSize}>
          {keyboardSize}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default KeyboardTypeSelect;
