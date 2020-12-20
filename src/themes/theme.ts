import { createMuiTheme } from '@material-ui/core';

const DARK_THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#5294e2',
      contrastText: '#EEEEEE',
    },
    background: {
      default: '#212121',
    },
    text: {
      primary: '#EEEEEE',
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

export default DARK_THEME;
