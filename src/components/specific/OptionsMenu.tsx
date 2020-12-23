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
import Option from './Option';
import TempoSlider from './TempoSlider';
import KeyboardTypeSelect from './KeyboardTypeSelect';
import TransposeCounter from './TransposeCounter';
import GameModeSelect from './GameModeSelect';

const useStyles = makeStyles({
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

const OptionsMenu: React.FC<Props & DialogProps> = ({ onClose, ...rest }) => {
  const classes = useStyles();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClose) onClose(event, 'closeButtonClick');
  };

  return (
    <Dialog maxWidth="xs" fullWidth onClose={onClose} {...rest}>
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
        <Option title="Keyboard type" className={classes.option}>
          <KeyboardTypeSelect className={classes.input} />
        </Option>
        <Option title="Tempo" className={classes.option}>
          <TempoSlider className={classes.input} />
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
