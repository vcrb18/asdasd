import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

function Hero() {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '60%',
          margin: '0 auto',
          flexDirection: 'column',
        }}
      >
        <Typography mt={8} variant="h2" align="center" color="primary">
          {t('landing.hero.title')}
        </Typography>
        <Typography mt={8} mb={4} variant="h5" align="justify" color="grey.700">
          {t('landing.hero.firstDescription')}
        </Typography>
        <Typography variant="h5" align="justify" color="grey.700">
          {t('landing.hero.secondDescription')}
        </Typography>
      </Box>
    </Box>
  );
}

export default Hero;
