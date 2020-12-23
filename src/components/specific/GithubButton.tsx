import React from 'react';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import StyleProps from '../../interfaces/StyleProps';

interface Props {
  disabled?: boolean;
}

const GithubButton: React.FC<Props & StyleProps> = ({ disabled, ...rest }) => (
  <IconButton
    size="medium"
    href="https://github.com/austinrsands/notefall"
    target="_blank"
    disabled={disabled}
    {...rest}
  >
    <GitHubIcon />
  </IconButton>
);

export default GithubButton;
