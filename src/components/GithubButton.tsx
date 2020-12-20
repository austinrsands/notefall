import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import StyleProps from '../interfaces/StyleProps';

interface Props {
  disabled?: boolean;
}

const GithubButton: React.FC<Props & StyleProps> = (props) => (
  <Tooltip title="Visit repo" enterDelay={500}>
    <IconButton
      href="https://github.com/austinrsands/notefall"
      target="_blank"
      {...props}
    >
      <GitHubIcon />
    </IconButton>
  </Tooltip>
);

export default GithubButton;
