import React from 'react';
import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import clsx from 'clsx';
import { useAppContext } from '../../contexts/AppContext';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const UploadLabel: React.FC<TypographyProps> = ({ className, ...rest }) => {
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
