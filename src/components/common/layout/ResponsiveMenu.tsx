import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/AuthContext';

import { IconButton, Menu, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

function ResponsiveMenu() {
  const navigate: NavigateFunction = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { user, signOut } = useAuth();
  const location = useLocation();

  const currentViewIsMainMenu = location.pathname === '/mainMenu';
  const currentViewIsLogin = location.pathname === '/';

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  function handleLogOut() {
    signOut();
    navigate('/');
    handleMenuClose();
  }

  return (
    <>
      <IconButton
        className="menu-button"
        sx={{
          color: '#e0e0e0',
          marginLeft: 'auto',
          display: 'flex',
          '@media (min-width: 720px)': {
            display: 'none',
          },
        }}
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ marginLeft: 'auto', color: '#000' }} />
      </IconButton>

      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <Stack direction="column">
          {user.isAuthenticated() ? (
            <Stack direction="column">
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate(currentViewIsMainMenu ? '/index' : '/mainMenu');
                }}
              >
                <Typography sx={{ alignSelf: 'center' }} color="primary">
                  {t(`general.${currentViewIsMainMenu ? 'index' : 'mainMenu'}`)}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Typography sx={{ alignSelf: 'center' }} color="primary">
                  {t('general.logout')}
                </Typography>
              </MenuItem>
            </Stack>
          ) : currentViewIsLogin ? (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate('/index');
              }}
            >
              <Typography color="primary">{t('general.index')}</Typography>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate('/');
              }}
            >
              <Typography color="primary">{t('general.login')}</Typography>
            </MenuItem>
          )}
          <Select
            value={language}
            onChange={(event: SelectChangeEvent) => i18n.changeLanguage(event.target.value)}
            sx={{
              boxShadow: 0,
            }}
          >
            <MenuItem value="es">
              <Typography color="primary">{t('languages.spanish')}</Typography>
            </MenuItem>
            <MenuItem value="en">
              <Typography color="primary">{t('languages.english')}</Typography>
            </MenuItem>
          </Select>
        </Stack>
      </Menu>
    </>
  );
}

export default ResponsiveMenu;
