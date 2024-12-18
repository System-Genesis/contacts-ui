import { useEffect, useMemo } from 'react';
import { environment } from './globals';
import Bowser from 'bowser';
import CssBaseline from '@mui/material/CssBaseline';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { AuthService } from './services/authService';
import { setUser } from './store/reducers/user';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { basicTheme } from './theme';
import { hebrew } from './i18n/hebrew';
import { initReactI18next } from 'react-i18next';
import { setSearchTerm } from './store/reducers/search';
import TopBar from './layout/topbar';
import { HeroSection } from './layout/heroSection';
import { ChatBot } from './layout/chatBot';
import { ContactDrawer } from './common/drawer/drawerWrapper';
import { useQuery } from '@tanstack/react-query';
import { getBackendConfigRequest } from './services/configService';
import { setConfig } from './store/reducers/config';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import { initializeMatomo } from './matomo';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = useSelector((state: RootState) => state.config);

  const contact = useSelector((state: RootState) => state.drawer.contact);
  const currentUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const resources = {
      he: { translation: hebrew },
    };
    void i18next.use(initReactI18next).init({
      resources,
      lng: 'he',
      interpolation: { escapeValue: false },
    });

    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies({
      chrome: `>=${environment.minimumSupportedChromeVersion}`,
    });

    if (!isValidBrowser)
      toast.error(i18next.t('error.unsupportedChromeVersion'), { autoClose: false, theme: 'colored' });
  }, []);

  const { data: backendConfig } = useQuery({
    queryKey: ['getBackendConfig'],
    queryFn: getBackendConfigRequest,
    meta: {
      errorMessage: i18next.t('error.config'),
    },
  });

  useEffect(() => {
    if (backendConfig) dispatch(setConfig(backendConfig));
  }, [backendConfig, dispatch]);

  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  useEffect(() => {
    let inactivityTimeout: () => void;
    const startInactivityTimer = () => {
      if (isOpen) return clearTimeout(inactivityTimeout);

      inactivityTimeout = setTimeout(() => {
        dispatch(setSearchTerm(''));
        navigate('/');
      }, config.resetTimeout);
    };

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      startInactivityTimer();
    };

    startInactivityTimer();

    config.resetTimeoutActions?.forEach((action) => window.addEventListener(action, resetTimeout));

    return () => {
      clearTimeout(inactivityTimeout);
      config.resetTimeoutActions?.forEach((action) => window.removeEventListener(action, resetTimeout));
    };
  }, [dispatch, navigate, isOpen]);

  const { trackEvent } = useMatomo();

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthService.getUser();
      if (user) {
        dispatch(setUser(user));

        trackEvent({
          category: 'LogIn',
          action: 'LogIn',
          name: `User: ${(user.id, user.adfsId, user.fullName, user.hierarchy, user.rank)}`,
        });
      }
    };
    void getUser();
  }, [dispatch]);

  if (!currentUser) redirect(`/unauthorized`);

  const theme = { ...basicTheme };
  const lightTheme = createTheme({ ...theme });

  const matomoInstance = useMemo(() => {
    if (config.matomoUrl && config.matomoSiteID) return initializeMatomo(config.matomoUrl, config.matomoSiteID);
    return null;
  }, [config.matomoUrl, config.matomoSiteID]);

  return (
    <MatomoProvider value={matomoInstance}>
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            background: 'white',
            overflow: 'hidden',
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingRight: 3,
              paddingLeft: 3,
              paddingTop: 1,
            }}
          >
            <TopBar />
            <HeroSection />
            <Outlet />
            <ContactDrawer
              contact={contact}
              alowEdit={contact?.id === currentUser.id || contact?.id === currentUser.directGroup}
            />
          </Box>
        </Box>
        <ChatBot />
      </ThemeProvider>
    </MatomoProvider>
  );
};

export default App;
