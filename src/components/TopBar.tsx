import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import UploadWidget from './UploadWidget';
import OptionsWidget from './OptionsWidget';
import PlayPauseButton from './PlayPauseButton';
import ReplayButton from './ReplayButton';
import GithubButton from './GithubButton';

const useStyles = makeStyles({
  root: {
    padding: '0.7rem 1rem',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
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

const TopBar: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} style={style}>
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
