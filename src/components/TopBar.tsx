import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { StyleProps } from '../styles/style';
import ControlsWidget from './ControlsWidget';
import GithubButton from './GithubButton';
import UploadWidget from './UploadWidget';

const useStyles = makeStyles({
  root: {
    padding: '0.7rem 1rem',
    display: 'flex',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

const TopBar: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} style={style}>
      <Box className={classes.left}>
        <UploadWidget />
      </Box>
      <Box className={classes.center}>
        <ControlsWidget />
      </Box>
      <Box className={classes.right}>
        <GithubButton />
      </Box>
    </Box>
  );
};

export default TopBar;
