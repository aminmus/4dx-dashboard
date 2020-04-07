import { createMuiTheme } from '@material-ui/core/styles';

import COLORS from './COLORS';

const { primary, secondary } = COLORS;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: primary },
    secondary: { main: secondary }
  }
});

export default theme;
