import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { StyleProps } from '../styles/style';
import WaitModeSwitch from './WaitModeSwitch';
import Option from './Option';
import TempoSlider from './TempoSlider';
import KeyboardSelect from './KeyboardSelect';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  option: {
    margin: '1rem 0.8rem',
  },
  input: {
    maxWidth: '60%',
  },
});

interface Props {
  open: boolean;
  onClose?: () => void;
}
const OptionsMenu: React.FC<Props & StyleProps> = ({
  className,
  style,
  open,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={className}
      style={style}
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle disableTypography>
        <Typography variant="h5" className={classes.title}>
          Options
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Option title="Wait mode" className={classes.option}>
          <WaitModeSwitch className={classes.input} />
        </Option>
        <Option title="Tempo" className={classes.option}>
          <TempoSlider className={classes.input} />
        </Option>
        <Option title="Keyboard" className={classes.option}>
          <KeyboardSelect className={classes.input} />
        </Option>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionsMenu;
