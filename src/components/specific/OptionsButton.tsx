import React from 'react';
import { IconButton } from '@material-ui/core';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import StyleProps from '../../interfaces/StyleProps';

interface Props {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const OptionsButton: React.FC<Props & StyleProps> = ({ disabled, ...rest }) => (
  <IconButton size="medium" disabled={disabled} {...rest}>
    <TuneRoundedIcon />
  </IconButton>
);

export default OptionsButton;
