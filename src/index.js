import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material'
import { amber, grey } from '@mui/material/colors'
import { createTheme, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

// Pallete: https://imagecolorpicker.com/user/shared-palette?id=02678879-f013-4ad9-bee8-1a132a12fe9b

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main : '#8a9afb',
            dark : '#606baf'
          },
          secondary : {
            main : '#d500f9',
            dark : '#9500ae'
          },
          divider: '#4a0072',
          background: {
            default: '#FFF',
            paper: grey[100],
          },
          text: {
            primary: '#black',
            secondary: grey[500],
          },
        }),
  },
});

const theme = createTheme(adaptV4Theme({
  ...getDesignTokens('dark'),
  typography : {
    fontPrime : {
      fontFamily : '"Nunito"', //['"Nunito"','sans-serif'].join(','),
    },
  },
  heading : {
    fontFamily : "Nunito",
    fontSize : "4rem",
    fontWeight : "600",
    color: '#FFF'
  },
  subheading : {
    fontSize : "1.5rem"
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
    }
  }
}));

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
