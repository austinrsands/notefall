import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import StyleProps from '../interfaces/StyleProps';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

const OptionsButton: React.FC<Props & StyleProps> = ({
  onClick,
  disabled,
  ...rest
}) => (
  <Tooltip title="Options" enterDelay={500} {...rest}>
    <IconButton size="medium" onClick={onClick} disabled={disabled}>
      <TuneRoundedIcon />
    </IconButton>
  </Tooltip>
);

export default OptionsButton;
