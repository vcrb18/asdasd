import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
  const { t } = useTranslation();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        top: 'auto',
        bottom: 0,
        marginTop: '0.5%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h5">{t('landing.footer.footerText')}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
