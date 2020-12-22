import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';
import KeyboardType from '../enums/KeyboardType';

interface Props {
  disabled?: boolean;
}

const KeyboardTypeSelect: React.FC<Props & StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  // Selects keyboard size
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    appDispatch({
      type: 'update-keyboard-type',
      keyboardType: event.target.value as KeyboardType,
    });
  };

  return (
    <TextField
      fullWidth
      select
      value={appState.keyboardType}
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
