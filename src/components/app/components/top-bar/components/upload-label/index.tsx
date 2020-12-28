import React from 'react';
import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import clsx from 'clsx';
import { useGameContext } from '../../../../contexts/game-context';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const UploadLabel: React.FC<TypographyProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { gameState } = useGameContext();

  return (
    <Typography
      className={clsx(classes.root, className)}
      variant="body2"
      color="textSecondary"
      {...rest}
    >
      {gameState.song?.name || 'no file uploaded'}
    </Typography>
  );
};

export default UploadLabel;
