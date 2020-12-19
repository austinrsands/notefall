import React from 'react';
import { Switch } from '@material-ui/core';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';

const WaitModeSwitch: React.FC<StyleProps> = ({ className, style }) => {
  const { appState, appDispatch } = useAppContext();

  // Enables or disables wait mode
  const handleWaitModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) appDispatch({ type: 'enable-wait-mode' });
    else appDispatch({ type: 'disable-wait-mode' });
  };

  return (
    <Switch
      className={className}
      style={style}
      checked={appState.waitModeEnabled}
      color="primary"
      size="medium"
      onChange={handleWaitModeChange}
    />
  );
};

export default WaitModeSwitch;
