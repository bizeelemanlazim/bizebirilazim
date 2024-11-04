import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  components:{
    MuiPaper:{
      styleOverrides:{
        root:{
          borderRadius: '20px'
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    }
  },
  typography: {
    fontFamily: 'Quicksand, Arial',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#0794D0'
    },
    secondary: {
      main: '#05648C'
    },
    background: {
      default: '#FBFBFB',
      paper: '#ffffff',
    },
    text:{
      primary: '#1B182E',
    }
  },
});
