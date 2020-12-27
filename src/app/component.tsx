import React from 'react';
import { Box, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { GameContextProvider } from './game-context/context';
import DeviceManager from './device-manager/component';
import Sketch from './sketch/component';
import TopBar from './top-bar/component';
import { DARK_THEME } from './theming/themes';

const useStyles = makeStyles({
  sketch: {
    position: 'fixed',
    minWidth: '50rem',
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={DARK_THEME}>
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
