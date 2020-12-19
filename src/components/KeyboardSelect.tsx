import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';
import { Keyboard, KEYBOARDS } from '../piano/piano';

const KeyboardSelect: React.FC<StyleProps> = ({ className, style }) => {
  const { appState, appDispatch } = useAppContext();

  // Selects keyboard
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    appDispatch({
      type: 'update-keyboard',
      keyboard: event.target.value as Keyboard,
    });
  };

  return (
    <TextField
      className={className}
      style={style}
      fullWidth
      select
      value={appState.keyboard}
      onChange={handleChange}
    >
      {KEYBOARDS.map((keyboard) => (
        <MenuItem key={keyboard} value={keyboard}>
          {keyboard}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default KeyboardSelect;
