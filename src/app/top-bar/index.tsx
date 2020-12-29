import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import UploadWidget from './upload-widget';
import OptionsWidget from './options-widget';
import PlayPauseButton from './play-pause-button';
import ReplayButton from './replay-button';
import GithubButton from './github-button';

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
  group: {
    display: 'flex',
    alignItems: 'center',
  },
  control: {
    margin: '0 2rem',
  },
});

const TopBar: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.left}>
        <UploadWidget />
      </Box>
      <Box className={classes.center}>
        <Box className={classes.group}>
          <OptionsWidget className={classes.control} />
          <PlayPauseButton className={classes.control} />
          <ReplayButton className={classes.control} />
        </Box>
      </Box>
      <Box className={classes.right}>
        <GithubButton />
      </Box>
    </Box>
  );
};

export default TopBar;
