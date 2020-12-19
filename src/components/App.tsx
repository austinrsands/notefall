import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from '../contexts/AppContext';
import theme from '../styles/theme';
import Content from './Content';
import DeviceManager from './DeviceManager';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContextProvider>
      <SnackbarProvider maxSnack={3}>
        <Content />
        <DeviceManager />
      </SnackbarProvider>
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
