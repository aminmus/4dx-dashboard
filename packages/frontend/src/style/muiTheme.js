import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import COLORS from './COLORS';

const { primary, secondary, light, gray } = COLORS;

const theme = createMuiTheme({
  /** Overrides to handle React Admin styles */
  overrides: {
    MuiButton: {
      label: {
        '&:hover': {
          color: 'white'
        }
      }
    },
    MuiCardContent: {
      root: {
        justifyContent: 'center',
        textAlign: 'center'
      }
    },
    MuiTableCell: {
      alignRight: {
        textAlign: 'center'
      },
      head: {
        textAlign: 'center',
        backgroundColor: light,
        fontWeight: 'bolder'
      },
      body: {
        textAlign: 'center'
      },
      root: {
        textAlign: 'center'
      }
    }
  },
  palette: {
    type: 'dark',
    primary: { main: primary },
    secondary: { main: secondary }
  },
  typography: {
    h1: {
      textAlign: 'center',
      color: light,
      marginBottom: '0.2em'
    },
    h2: {
      textAlign: 'center',
      color: light,
      marginBottom: '0.2em'
    },
    h3: {
      textAlign: 'center',
      color: gray,
      marginBottom: '0.2em'
    },
    h4: {
      textAlign: 'center',
      color: gray
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
