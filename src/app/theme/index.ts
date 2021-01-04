import { createMuiTheme } from '@material-ui/core';
import { grey, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue[600],
    },
    background: {
      default: grey[900],
    },
  },
  typography: {
    allVariants: {
      letterSpacing: '0.05rem',
    },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
