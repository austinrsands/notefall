import React from 'react';
import { Tooltip, Box, IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { StyleProps } from '../styles/style';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

const ReplayButton: React.FC<Props & StyleProps> = ({ className, style, onClick, disabled }) => (
  <Box className={className} style={style}>
    <Tooltip title="Replay song" enterDelay={500}>
      <IconButton size="medium" onClick={onClick} disabled={disabled}>
        <ReplayRoundedIcon />
      </IconButton>
    </Tooltip>
  </Box>
);

export default ReplayButton;
