import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import StyleProps from '../interfaces/StyleProps';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {},
  value: {
    padding: '0 2rem',
    minWidth: '6rem',
    textAlign: 'center',
  },
});

interface Props {
  value?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<Props & StyleProps> = ({
  className,
  value = 0,
  minValue,
  maxValue,
  step = 1,
  onChange,
  ...rest
}) => {
  const classes = useStyles();

  const handleDecrement = () => {
    if (onChange) onChange(value - step);
  };

  const handleIncrement = () => {
    if (onChange) onChange(value + step);
  };

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <IconButton
        className={classes.button}
        onClick={handleDecrement}
        disabled={minValue !== undefined && value === minValue}
        color="primary"
      >
        <RemoveRoundedIcon />
      </IconButton>
      <Typography className={classes.value}>{value}</Typography>
      <IconButton
        className={classes.button}
        size="medium"
        onClick={handleIncrement}
        disabled={maxValue !== undefined && value === maxValue}
        color="primary"
      >
        <AddRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
