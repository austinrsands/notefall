import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';
import UploadButton from './UploadButton';
import UploadLabel from './UploadLabel';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    paddingLeft: '1.5rem',
  },
});

const UploadWidget: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} style={style}>
      <UploadButton />
      <UploadLabel className={classes.label} />
    </Box>
  );
};

export default UploadWidget;
