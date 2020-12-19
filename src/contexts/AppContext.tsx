import React, { createContext, useReducer, useContext } from 'react';
import appReducer, {
  AppAction,
  AppState,
  DEFAULT_APP_STATE,
} from '../reducers/appReducer';

interface AppContextData {
  appState: AppState;
  appDispatch: React.Dispatch<AppAction>;
}
const AppContext = createContext<AppContextData | undefined>(undefined);

const AppContextProvider: React.FC = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, DEFAULT_APP_STATE);

  const appContextData: AppContextData = {
    appState,
    appDispatch,
  };

  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextData => {
  const appContext = useContext(AppContext);
  if (appContext === undefined) throw new Error('App Context is undefined.');
  return appContext;
};

export default AppContextProvider;
