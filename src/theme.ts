import { ThemeOptions as ThemeOptionsMui } from '@mui/material';
import '@fontsource/rubik';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/400-italic.css';

export const basicTheme: ThemeOptions = {
  direction: 'rtl',
  spacing: 8,
  typography: {
    fontSize: 12,
    fontFamily: 'Rubik',
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px white inset',
            WebkitTextFillColor: '#000000',
          },
          '& input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 100px white inset',
            WebkitTextFillColor: '#000000',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 100px white inset',
            WebkitTextFillColor: '#000000',
          },
          '& input:-webkit-autofill:active': {
            WebkitBoxShadow: '0 0 0 100px white inset',
            WebkitTextFillColor: '#000000',
          },
        },
      },
    },
  },
  palette: {
    text: {
      primary: '#000',
    },
    primary: {
      main: '#000',
    },
  },
  colors: {
    black: '#0F2423',
    white: '#FFFF',
    aqua: '#57AA9A',
    aquaDark: '#56968a',
    lightAqua: '#EDF7F4',
    darkAqua: '#81C7B7',
    gray: '#F7F7F7',
    green: '#295C54',
    subTitleBack: '#F3FAF8',
    subTitle: '#2A5B5B',
  },
};

interface ThemeOptions extends ThemeOptionsMui {
  colors?: {
    black?: string;
    white?: string;
    aqua?: string;
    aquaDark?: string;
    lightAqua?: string;
    darkAqua?: string;
    gray?: string;
    green?: string;
    subTitleBack?: string;
    subTitle?: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      black: string;
      white: string;
      aqua: string;
      aquaDark: string;
      lightAqua: string;
      darkAqua: string;
      gray: string;
      green: string;
      subTitleBack: string;
      subTitle: string;
    };
  }
}
// allow configuration using `createTheme`
