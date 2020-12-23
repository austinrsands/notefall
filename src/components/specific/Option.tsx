import React from 'react';
import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

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

const Option: React.FC<Props & BoxProps> = ({
  className,
  title,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Typography variant="subtitle1">{title}</Typography>
      {children}
    </Box>
  );
};

export default Option;
