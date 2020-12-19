import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';
import { KeyboardSize, KEYBOARDS_SIZES } from '../piano/constants';

const KeyboardSizeSelect: React.FC<StyleProps> = ({ className, style }) => {
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
      className={className}
      style={style}
      fullWidth
      select
      value={appState.keyboardSize}
      onChange={handleChange}
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
