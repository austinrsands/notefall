import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Sketch from './Sketch';
import TopBar from './TopBar';
import StyleProps from '../interfaces/StyleProps';
import DeviceManager from './DeviceManager';

const useStyles = makeStyles({
  sketch: {
    position: 'fixed',
  },
});

const Content: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();
  return (
    <Box className={className} style={style}>
      <Sketch className={classes.sketch} />
      <TopBar />
      <DeviceManager />
    </Box>
  );
};

export default Content;
