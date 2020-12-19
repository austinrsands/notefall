import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import { StyleProps } from '../styles/style';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

const OptionsButton: React.FC<Props & StyleProps> = ({
  className,
  style,
  onClick,
  disabled,
}) => (
  <Tooltip className={className} style={style} title="Options" enterDelay={500}>
    <IconButton size="medium" onClick={onClick} disabled={disabled}>
      <TuneRoundedIcon />
    </IconButton>
  </Tooltip>
);

export default OptionsButton;
