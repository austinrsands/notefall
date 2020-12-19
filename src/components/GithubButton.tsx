import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { StyleProps } from '../styles/style';

const GithubButton: React.FC<StyleProps> = ({ className, style }) => (
  <Tooltip
    className={className}
    style={style}
    title="Visit repo"
    enterDelay={500}
  >
    <IconButton href="https://github.com/austinrsands/notefall" target="_blank">
      <GitHubIcon />
    </IconButton>
  </Tooltip>
);

export default GithubButton;
