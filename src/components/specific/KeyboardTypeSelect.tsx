import React from 'react';
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { useAppContext } from '../../contexts/AppContext';
import KeyboardType from '../../enums/KeyboardType';

const KeyboardTypeSelect: React.FC<TextFieldProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

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
