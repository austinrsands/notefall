import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { MIN_TRANSPOSE, MAX_TRANSPOSE } from '../constants/options';
import { useAppContext } from '../contexts/AppContext';
import StyleProps from '../interfaces/StyleProps';
import Counter from './Counter';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TransposeCounter: React.FC<StyleProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState, appDispatch } = useAppContext();

  const handleChange = (transpose: number) => {
    appDispatch({ type: 'update-transpose', transpose });
  };

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Counter
        value={appState.transpose}
        minValue={MIN_TRANSPOSE}
        maxValue={MAX_TRANSPOSE}
        step={1}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TransposeCounter;
