import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import UploadButton from '../upload-button';
import UploadLabel from '../upload-label';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    paddingLeft: '1.5rem',
  },
});

const UploadWidget: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <UploadButton />
      <UploadLabel className={classes.label} />
    </Box>
  );
};

export default UploadWidget;
