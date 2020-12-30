import React from 'react';
import { Box, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import DeviceManager from './device-manager';
import { GameContextProvider } from './game-context';
import Sketch from './sketch';
import TopBar from './top-bar';
import theme from './theme';

const useStyles = makeStyles({
  sketch: {
    position: 'fixed',
    minWidth: '50rem',
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
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
