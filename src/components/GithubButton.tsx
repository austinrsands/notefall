import React from 'react';
import { Tooltip, Box, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { StyleProps } from '../styles/style';

const GithubButton: React.FC<StyleProps> = ({ className, style }) => (
  <Box className={className} style={style}>
    <Tooltip title="Visit repo" enterDelay={500}>
      <IconButton
        href="https://github.com/austinrsands/notefall"
        target="_blank"
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  </Box>
);

export default GithubButton;
