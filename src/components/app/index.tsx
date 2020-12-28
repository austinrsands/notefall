import React from 'react';
import { Box, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { darkTheme } from './theme';
import DeviceManager from './components/device-manager';
import Sketch from './components/sketch';
import TopBar from './components/top-bar';
import { GameContextProvider } from './contexts/game-context';

const useStyles = makeStyles({
  sketch: {
    position: 'fixed',
    minWidth: '50rem',
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GameContextProvider>
        <SnackbarProvider>
          <Box>
            <Sketch className={classes.sketch} />
            <TopBar />
            <DeviceManager />
          </Box>
        </SnackbarProvider>
      </GameContextProvider>
    </ThemeProvider>
  );
};

export default App;
