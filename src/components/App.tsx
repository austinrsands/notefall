import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from '../contexts/AppContext';
import DARK_THEME from '../themes/darkTheme';
import Content from './Content';

const App: React.FC = () => (
  <ThemeProvider theme={DARK_THEME}>
    <CssBaseline />
    <AppContextProvider>
      <SnackbarProvider>
        <Content />
      </SnackbarProvider>
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
