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
import StyleProps from '../interfaces/StyleProps';
import WaitModeSwitch from './WaitModeSwitch';
import Option from './Option';
import TempoSlider from './TempoSlider';
import KeyboardSizeSelect from './KeyboardSizeSelect';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  option: {
    padding: '0.5rem 0.8rem',
  },
  input: {
    maxWidth: '60%',
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
        <Option title="Keyboard Size" className={classes.option}>
          <KeyboardSizeSelect className={classes.input} />
        </Option>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionsMenu;
