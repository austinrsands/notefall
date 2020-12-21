import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import StyleProps from '../interfaces/StyleProps';
import WaitModeSwitch from './WaitModeSwitch';
import Option from './Option';
import TempoSlider from './TempoSlider';
import KeyboardSizeSelect from './KeyboardSizeSelect';
import TransposeCounter from './TransposeCounter';

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
    padding: '0.5rem 2rem',
  },
  input: {
    maxWidth: '50%',
  },
});

interface Props {
  open: boolean;
  onClose?: () => void;
}
const OptionsMenu: React.FC<Props & StyleProps> = ({ onClose, ...rest }) => {
  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" fullWidth onClose={onClose} {...rest}>
      <DialogTitle disableTypography className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Options
        </Typography>
        <IconButton size="medium" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Option title="Wait mode" className={classes.option}>
          <WaitModeSwitch className={classes.input} />
        </Option>
        <Option title="Transpose" className={classes.option}>
          <TransposeCounter className={classes.input} />
        </Option>
        <Option title="Tempo" className={classes.option}>
          <TempoSlider className={classes.input} />
        </Option>
        <Option title="Keyboard size" className={classes.option}>
          <KeyboardSizeSelect className={classes.input} />
        </Option>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default OptionsMenu;
