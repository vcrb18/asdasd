import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { logosDetails, teamDescription } from '@/utils/constants/landing/index';

const Team = () => {
  const { t } = useTranslation();

  const logosSize = {
    maxWidth: '100%',
    maxHeight: '100%',
  };

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
        <Typography variant="h2" mb={5} align={'center'} color="primary">
          {t('landing.team.title')}
        </Typography>
        {teamDescription.map((team) => (
          <Box padding={2}>
            <Typography variant="h5" align="center">
              {t(team.text)}
            </Typography>
          </Box>
        ))}
        <Grid
          container
          mb={10}
          rowSpacing={2}
          padding={2}
          sx={{
            marginTop: '2%',
            width: '-webkit-fill-available',
            heigth: '-webkit-fill-available',
            alignItems: 'center',
          }}
        >
          {logosDetails.map((logo) => (
            <Grid item xs={12} md={6} lg={3} sx={{ logosSize }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: 'md',
                  margin: '0 auto',
                }}
              >
                <img src={logo.image} alt={logo.alt} width={logo.width} height={logo.height} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Team;
