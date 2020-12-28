import {
  Box,
  BoxProps,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  value: {
    padding: '0 2rem',
    minWidth: '6rem',
    textAlign: 'center',
  },
  button: {
    padding: '0.4rem',
  },
});

interface Props {
  value?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export type CounterProps = Props & Omit<BoxProps, 'onChange'>;

const Counter: React.FC<CounterProps> = ({
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
        aria-label="decrement"
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
        aria-label="increment"
      >
        <AddRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
