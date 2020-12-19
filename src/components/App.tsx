import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from '../contexts/AppContext';
import theme from '../styles/theme';
import Content from './Content';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContextProvider>
      <SnackbarProvider>
        <Content />
      </SnackbarProvider>
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
