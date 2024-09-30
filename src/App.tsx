import { useEffect } from 'react';
import { environment } from './globals';
import Bowser from 'bowser';
import CssBaseline from '@mui/material/CssBaseline';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { AuthService } from './services/authService';
import { setUser } from './store/reducers/user';
import { Outlet, redirect } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { basicTheme } from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { hebrew } from './i18n/hebrew';
import { initReactI18next } from 'react-i18next';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const resources = {
      he: {
        translation: hebrew,
      },
    };
    void i18next.use(initReactI18next).init({
      resources,
      lng: 'he',
      interpolation: {
        escapeValue: false,
      },
    });

    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies({
      chrome: `>=${environment.minimumSupportedChromeVersion}`,
    });

    if (!isValidBrowser) {
      toast.error(i18next.t('error.unsupportedChromeVersion'), { autoClose: false, theme: 'colored' });
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthService.getUser();
      if (user) {
        dispatch(setUser(user));
      }
    };

    void getUser();
  }, [dispatch]);

  const currentUser = useSelector((state: RootState) => state.user);

  if (!currentUser) redirect(`/unauthorized`);

  const theme = { ...basicTheme };
  const lightTheme = createTheme({ ...theme });

  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            // background: 'linear-gradient(180deg, rgba(36, 155, 155, 0.015) 0%, rgba(36, 155, 155, 0.105) 100%)}};',
            overflow: 'hidden',
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              flex: 25,
              display: 'flex',
              flexDirection: 'column',
              paddingRight: 4,
              paddingLeft: 4,
              paddingBottom: 2,
            }}
          >
            <Box sx={{ flex: 1, zIndex: 2 }}>{/* <SearchBar value={value} setValue={setValue} /> */}</Box>
            <Box
              component="main"
              sx={{
                flex: 15,
                zIndex: 2,
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
