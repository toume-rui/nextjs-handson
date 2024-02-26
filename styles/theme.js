import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: red,
    secondary: purple,
  },
});

export default theme;
