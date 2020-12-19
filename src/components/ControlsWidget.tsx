import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { StyleProps } from '../styles/style';
import OptionsButton from './OptionsButton';
import PlayPauseButton from './PlayPauseButton';
import ReplayButton from './ReplayButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: '0 1.5rem',
  },
});

const ControlsWidget: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} style={style}>
      <OptionsButton className={classes.button} />
      <PlayPauseButton className={classes.button} />
      <ReplayButton className={classes.button} />
    </Box>
  );
};

export default ControlsWidget;
