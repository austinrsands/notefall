import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import AppContextProvider from '../contexts/AppContext';
import theme from '../styles/theme';
import Content from './Content';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContextProvider>
      <Content />
    </AppContextProvider>
  </ThemeProvider>
);

export default App;
