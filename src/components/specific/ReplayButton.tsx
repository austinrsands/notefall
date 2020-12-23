import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import StyleProps from '../../interfaces/StyleProps';
import { useAppContext } from '../../contexts/AppContext';

interface Props {
  disabled?: boolean;
}

const ReplayButton: React.FC<Props & StyleProps> = ({ disabled, ...rest }) => {
  const { appDispatch } = useAppContext();

  const handleClick = () => {
    appDispatch({ type: 'restart' });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      <ReplayRoundedIcon />
    </IconButton>
  );
};

export default ReplayButton;
