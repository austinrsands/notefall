import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  DialogProps,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import clsx from 'clsx';
import Option from '../../../generic/label';
import TempoScaleSlider from './components/tempo-scale-slider';
import KeyboardTypeSelect from './components/keyboard-type-select';
import TransposeCounter from './components/transpose-counter';
import GameModeSelect from './components/game-mode-select';

const useStyles = makeStyles({
  root: {
    minWidth: '30rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: '0.8rem 0.2rem',
  },
  option: {
    padding: '0.8rem 2rem',
  },
  input: {
    flex: 1,
    maxWidth: '50%',
  },
});

interface Props {
  onClose?: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick',
  ) => void;
}

const OptionsMenu: React.FC<Props & DialogProps> = ({
  className,
  onClose,
  ...rest
}) => {
  const classes = useStyles();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClose) onClose(event, 'closeButtonClick');
  };

  return (
    <Dialog
      className={clsx(classes.root, className)}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
      {...rest}
    >
      <DialogTitle disableTypography className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Options
        </Typography>
        <IconButton size="medium" onClick={handleClick}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Option title="Mode" className={classes.option}>
          <GameModeSelect className={classes.input} />
        </Option>
        <Option title="Keyboard" className={classes.option}>
          <KeyboardTypeSelect className={classes.input} />
        </Option>
        <Option title="Tempo" className={classes.option}>
          <TempoScaleSlider className={classes.input} />
        </Option>
        <Option title="Transpose" className={classes.option}>
          <TransposeCounter className={classes.input} />
        </Option>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default OptionsMenu;
