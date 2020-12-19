import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import theme from '../styles/theme';
import Content from './Content';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Content />
  </ThemeProvider>
);

export default App;
