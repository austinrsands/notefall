import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import StyleProps from '../interfaces/StyleProps';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface Props {
  title: string;
}

const Option: React.FC<Props & StyleProps> = ({
  className,
  style,
  title,
  children,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} style={style}>
      <Typography variant="subtitle1">{title}</Typography>
      {children}
    </Box>
  );
};

export default Option;
