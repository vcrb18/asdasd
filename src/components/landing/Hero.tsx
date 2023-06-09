import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

const Hero = () => {
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
          Bienvenido a ISATEC Heart, un equipo de investigación y desarrollo dedicado a explorar el potencial de la
          inteligencia artificial (IA) en el campo de la cardiología.
        </Typography>
        <Typography variant="h5" align="justify" color="grey.700">
          Nuestro equipo se centra en desarrollar herramientas y tecnologías de IA de vanguardia para ayudar a mejorar
          el diagnóstico, tratamiento y manejo de las enfermedades del corazón. A través de nuestra investigación,
          buscamos ampliar los límites de lo que es posible en el campo de la cardiología y contribuir al avance de la
          ciencia médica.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
