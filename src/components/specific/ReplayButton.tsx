import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import StyleProps from '../../interfaces/StyleProps';
import { useAppContext } from '../../contexts/AppContext';

const ReplayButton: React.FC<StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  const handleClick = () => {
    appDispatch({ type: 'restart' });
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      disabled={appState.song === undefined}
      {...props}
    >
      <ReplayRoundedIcon />
    </IconButton>
  );
};

export default ReplayButton;
