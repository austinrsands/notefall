import React from 'react';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { StyleProps } from '../../util/structures';

interface Props {
  disabled?: boolean;
}

const GithubButton: React.FC<Props & StyleProps> = ({ disabled, ...rest }) => (
  <IconButton
    size="medium"
    href="https://github.com/austinrsands/notefall"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub repo link"
    disabled={disabled}
    {...rest}
  >
    <GitHubIcon />
  </IconButton>
);

export default GithubButton;
