import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { StyleProps } from '../styles/style';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

interface Props {
  text?: string;
}

const UploadLabel: React.FC<Props & StyleProps> = ({
  className,
  style,
  text,
}) => {
  const classes = useStyles();
  return (
    <Typography
      className={clsx(classes.root, className)}
      style={style}
      variant="body2"
      color="textSecondary"
    >
      {text}
    </Typography>
  );
};

export default UploadLabel;
