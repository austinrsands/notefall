import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { MIN_TRANSPOSE, MAX_TRANSPOSE } from '../../constants';
import { useGameContext } from '../../../../contexts/game-context';
import Counter from '../../../../../generic/counter';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TransposeCounter: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { gameState, gameDispatch } = useGameContext();

  const handleChange = (transpose: number) => {
    gameDispatch({ type: 'update-transpose', transpose });
  };

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Counter
        value={gameState.transpose}
        minValue={MIN_TRANSPOSE}
        maxValue={MAX_TRANSPOSE}
        step={1}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TransposeCounter;
