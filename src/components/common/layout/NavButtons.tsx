import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import GenericButton from '@/atoms/Button';
import { useAuth } from '@/hooks/AuthContext';

import { CircularProgress, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

import { OSessionState } from '@/ts/types/sessionTypes';

import ResponsiveMenu from './ResponsiveMenu';

function NavButtons() {
  const navigate: NavigateFunction = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { user, signOut, state } = useAuth();
  const location = useLocation();

  const currentViewIsMainMenu = location.pathname === '/mainMenu';
  const currentViewIsLogin = location.pathname === '/';

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Stack direction="row">
      {windowWidth > 720 ? (
        <Stack direction="row">
          {user.isAuthenticated() ? (
            <Stack direction="row" my={2} spacing={2}>
              <Typography variant="h5" sx={{ alignSelf: 'center' }} color="primary">
                {user.fullName()}
              </Typography>
              <GenericButton
                label={t(`general.${currentViewIsMainMenu ? 'index' : 'mainMenu'}`)}
                onPress={() => navigate(currentViewIsMainMenu ? '/index' : '/mainMenu')}
              />
              <GenericButton label={t('general.logout')} onPress={signOut} href="/" />
            </Stack>
          ) : state == OSessionState.Loading ? (
            <Stack direction="row" my={2}>
              <CircularProgress />
            </Stack>
          ) : currentViewIsLogin ? (
            <Stack direction="row" my={2}>
              <GenericButton label={t('general.index')} onPress={() => navigate('/index')} />
            </Stack>
          ) : (
            <Stack direction="row" my={2}>
              <GenericButton label={t('general.login')} onPress={() => navigate('/')} />
            </Stack>
          )}
          <Select
            value={language}
            onChange={(event: SelectChangeEvent) => i18n.changeLanguage(event.target.value)}
            sx={{
              mx: 4,
              marginTop: '17px',
              height: '36.5px',
              backgroundColor: '#007088',
              color: '#fff',
              display: { xs: 'none', sm: 'flex' },
              fontSize: {
                xs: '0.7rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '1rem',
              },
            }}
          >
            <MenuItem value="es"> {t('languages.spanish')} </MenuItem>
            <MenuItem value="en"> {t('languages.english')} </MenuItem>
          </Select>
        </Stack>
      ) : null}
      <ResponsiveMenu />
    </Stack>
  );
}

export default NavButtons;
