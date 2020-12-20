import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import { useAppContext } from '../contexts/AppContext';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const UploadLabel: React.FC<StyleProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState } = useAppContext();

  return (
    <Typography
      className={clsx(classes.root, className)}
      variant="body2"
      color="textSecondary"
      {...rest}
    >
      {appState.song?.name || 'no file uploaded'}
    </Typography>
  );
};

export default UploadLabel;
