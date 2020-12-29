import { createMuiTheme } from '@material-ui/core';
import { grey, lightBlue } from '@material-ui/core/colors';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue[600],
      contrastText: grey[200],
    },
    background: {
      default: grey[900],
    },
    text: {
      primary: grey[200],
    },
  },
  typography: {
    allVariants: {
      letterSpacing: '0.05rem',
    },
    fontFamily: [
      'Proxima Nova',
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
