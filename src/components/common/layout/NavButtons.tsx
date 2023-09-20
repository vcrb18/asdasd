import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import GenericButton from '@/atoms/Button';
import { useAuth } from '@/hooks/AuthContext';

import { CircularProgress, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

import { AppBarButtons } from '@/ts/interfaces/appBarButtons';
import { OSessionState } from '@/ts/types/sessionTypes';

import MenuIcon from '@mui/icons-material/Menu';

function NavButtons({ setOpenDrawer, openDrawer }: AppBarButtons) {
  const navigate: NavigateFunction = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { user, signOut, state } = useAuth();
  const location = useLocation();

  const currentViewIsMainMenu = location.pathname === '/mainMenu';
  const currentViewIsLogin = location.pathname === '/';

  return (
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
        }}
      >
        <MenuItem value="es"> Spanish </MenuItem>
        <MenuItem value="en"> English </MenuItem>
      </Select>
      <IconButton
        sx={{ color: '#e0e0e0', marginLeft: 'auto', display: { xs: 'flex', sm: 'none' } }}
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <MenuIcon sx={{ marginLeft: 'auto', color: '#000' }} />
      </IconButton>
    </Stack>
  );
}

export default NavButtons;
