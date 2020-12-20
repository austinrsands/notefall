import React from 'react';
import { Backdrop, Box, makeStyles, Typography } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';

const useStyles = makeStyles({
  content: {
    dislpay: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    padding: '0.5rem',
  },
  subtitle: {
    padding: '0.5rem',
  },
});

interface Props {
  open: boolean;
  title?: string;
  subtitle?: string;
}

const SimpleBackdrop: React.FC<Props & StyleProps> = ({
  title,
  subtitle,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Backdrop {...rest}>
      <Box className={classes.content}>
        <Typography className={classes.title} variant="h2" color="textPrimary">
          {title}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
          color="textSecondary"
        >
          {subtitle}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default SimpleBackdrop;
