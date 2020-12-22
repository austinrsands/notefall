import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Sketch from './Sketch';
import TopBar from './TopBar';
import DeviceManager from './DeviceManager';
import StyleProps from '../interfaces/StyleProps';

const useStyles = makeStyles({
  sketch: {
    position: 'fixed',
    minWidth: '50rem',
  },
});

const Content: React.FC<StyleProps> = (props) => {
  const classes = useStyles();
  return (
    <Box {...props}>
      <Sketch className={classes.sketch} />
      <TopBar />
      <DeviceManager />
    </Box>
  );
};

export default Content;
