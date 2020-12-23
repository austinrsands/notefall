import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from '../../contexts/AppContext';
import Content from './Content';
import { DARK_THEME } from '../../themes/theme';

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
