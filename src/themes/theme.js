import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#253b6e',
    },
    secondary: {
      main: '#324f94',
    },
    background: {
      default: '#ffffff',
      paper: '#e6e6e6',
    },
    text: {
      primary: '#ffffff',
      secondary: '#3f64ba',
    },
  },
  typography: {
    fontFamily: 'Circular, Arial, sans-serif',
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#ffffff',
    },
    body1: {
      color: '#182748',
    },
    body2: {
      color: '#3f64ba',
    },
  },
});

export default theme;
