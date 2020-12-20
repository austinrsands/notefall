import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import { KeyboardSize, KEYBOARDS_SIZES } from '../constants/keyboard';

interface Props {
  disabled?: boolean;
}

const KeyboardSizeSelect: React.FC<Props & StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  // Selects keyboard size
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    appDispatch({
      type: 'update-keyboard-size',
      keyboardSize: event.target.value as KeyboardSize,
    });
  };

  return (
    <TextField
      fullWidth
      select
      value={appState.keyboardSize}
      onChange={handleChange}
      {...props}
    >
      {KEYBOARDS_SIZES.map((keyboardSize) => (
        <MenuItem key={keyboardSize} value={keyboardSize}>
          {keyboardSize}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default KeyboardSizeSelect;
