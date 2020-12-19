import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';

interface Props {
  disabled?: boolean;
}

const ReplayButton: React.FC<Props & StyleProps> = ({
  className,
  style,
  disabled,
}) => {
  const { appDispatch } = useAppContext();

  // Restarts song
  const handleClick = () => {
    appDispatch({ type: 'restart' });
  };

  return (
    <Tooltip
      className={className}
      style={style}
      title="Replay song"
      enterDelay={500}
    >
      <IconButton size="medium" onClick={handleClick} disabled={disabled}>
        <ReplayRoundedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ReplayButton;
