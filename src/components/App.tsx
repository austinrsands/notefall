import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppContextProvider from '../contexts/AppContext';
import mainTheme from '../styles/themes';
import Content from './Content';

const App: React.FC = () => (
  <ThemeProvider theme={mainTheme}>
    <CssBaseline />
    <AppContextProvider>
      <SnackbarProvider>
        <Content />
      </SnackbarProvider>
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
