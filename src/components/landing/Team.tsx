import { Box, Grid, Typography } from '@mui/material';

import LogoCMM from '@/assets/images/logo_cmm.png';
import LogoIsatecCompleto from '@/assets/images/logo_isatec_completo.png';
import LogoUC from '@/assets/images/logo_uc.png';
import LogoUChile from '@/assets/images/logo_uchile.png';

const Team = () => {
  const logosCMM = {
    maxWidth: '100%',
    maxHeight: '100%',
  };
  const logosPUC = {
    maxWidth: '100%',
    maxHeight: '100%',
  };
  const logosUChile = {
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
          Equipo
        </Typography>
        <Box padding={2}>
          <Typography variant="h5" align="center" color="grey.700">
            Nuestro equipo está compuesto por investigadores, ingenieros y profesionales médicos talentosos que están
            apasionados por mejorar la vida de los pacientes con enfermedades del corazón.
          </Typography>
        </Box>
        <Box padding={2}>
          <Typography variant="h5" align="center">
            Trabajamos en estrecha colaboración con las principales instituciones y organizaciones médicas para asegurar
            que nuestra investigación esté a la vanguardia de los últimos desarrollos científicos.
          </Typography>
        </Box>

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
          <Grid item xs={12} md={6} lg={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 'md',
                margin: '0 auto',
              }}
            >
              <img src={LogoIsatecCompleto} alt="isatec" width={'50%'} height={'50%'} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ logosCMM }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 'md',
                margin: '0 auto',
              }}
            >
              <img src={LogoCMM} alt="cmm" width={'40%'} height={'40%'} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ logosUChile }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 'md',
                margin: '0 auto',
              }}
            >
              <img src={LogoUChile} alt="universidad de chile" width={'25%'} height={'25%'} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ logosPUC }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 'md',
                margin: '0 auto',
              }}
            >
              <img src={LogoUC} alt="universidad catolica" width={'30%'} height={'30%'} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Team;
