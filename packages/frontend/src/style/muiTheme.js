// @ts-nocheck
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import COLORS from './COLORS';

const { primary, secondary, light, gray } = COLORS;

const theme = createMuiTheme({
  textAlign: 'center',
  palette: {
    type: 'dark',
    primary: { main: primary },
    secondary: { main: secondary }
  },
  typography: {
    h1: {
      textAlign: 'center',
      color: light,
      marginBottom: '10px'
    },
    h2: {
      textAlign: 'center',
      color: light,
      marginBottom: '10px'
    },
    h3: {
      textAlign: 'center',
      color: gray,
      marginBottom: '10px'
    },
    h4: {
      textAlign: 'center',
      color: light
    },
    h5: {
      textAlign: 'center',
      color: light
    },
    h6: {
      textAlign: 'center',
      color: light
    },
    body1: {
      color: light
    },
    body2: {
      color: light
    }
  }
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
