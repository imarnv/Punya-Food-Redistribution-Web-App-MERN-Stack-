// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },
    secondary: { main: '#ff8f00' },
    background: {
      default: '#f8fbf6', // <-- Warm white with a green pinch
      paper: '#ffffff',
    },
    text: { primary: '#333333' },
  },
  // ... the rest of your theme file remains the same
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, color: '#2e7d32' },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 'bold' } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});

export default theme;