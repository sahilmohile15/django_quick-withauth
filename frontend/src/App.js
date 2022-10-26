import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter  from './routes'

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


const THEME = createTheme({
  typography: {
   "fontFamily": `"Noto Sans", "Raleway"`,
   "fontSize": 16,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  },
  palette: {
    secondary: {
      main: '#440055'
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        backgroundColor : "#440055",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
