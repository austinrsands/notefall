import React from 'react';
import { Switch } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';

const WaitModeSwitch: React.FC<StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  // Enables or disables wait mode
  const handleWaitModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) appDispatch({ type: 'enable-wait-mode' });
    else appDispatch({ type: 'disable-wait-mode' });
  };

  return (
    <Switch
      checked={appState.waitModeEnabled}
      color="primary"
      size="medium"
      onChange={handleWaitModeChange}
      {...props}
    />
  );
};

export default WaitModeSwitch;
