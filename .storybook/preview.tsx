import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { basicTheme } from '../src/theme';
import { store } from '../src/store';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = { ...basicTheme };
const lightTheme = createTheme({ ...theme });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <body dir="rtl">
        <Provider store={store}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={lightTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
                <Story />
              </LocalizationProvider>
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </body>
    ),
  ],
};

export default preview;
