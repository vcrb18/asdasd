import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';

import VerificacionExamenesImage from '@/assets/images/verificacion_examenes.png';
import ArritmiasImage from '@/assets/images/arritmia_image.png';
import ExtrasistoleImage from '@/assets/images/extrasistole.png';

const CustomGridElement = ({ children }: { children: JSX.Element[] }): JSX.Element => (
  <Grid item xs={12} lg={6}>
    <Paper sx={{ height: '100%', bgcolor: 'primary.main', px: 2 }} variant="outlined">
      {children}
    </Paper>
  </Grid>
);

const Projects = () => {
  const imagesStyle = {
    width: '50%',
    height: 'auto',
    padding: '1%',
    margin: 'auto',
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
        <Typography variant="h2" mt={10} align="center" color="primary">
          Nuestros Proyectos
        </Typography>
        <Grid
          container
          mb={10}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          padding={5}
          sx={{
            marginTop: '1%',
            width: '-webkit-fill-available',
            heigth: '-webkit-fill-available',
          }}
        >
          <CustomGridElement>
            <Typography variant="h4" align="center" color="grey.100">
              Verificación de exámenes
            </Typography>
            <Avatar
              src={VerificacionExamenesImage}
              alt="verificacion-examenes-image"
              variant="square"
              sx={imagesStyle}
            />
          </CustomGridElement>
          <CustomGridElement>
            <Typography variant="h4" align="center" color="grey.100">
              Atención personalizada
            </Typography>
            <Avatar src={ArritmiasImage} alt="arritmias-image" variant="square" sx={imagesStyle} />
          </CustomGridElement>
          <CustomGridElement>
            <Typography variant="h4" align="center" color="grey.100">
              Análisis de IA
            </Typography>
            <Avatar src={ExtrasistoleImage} alt="extrasistole-image" variant="square" sx={imagesStyle} />
          </CustomGridElement>
          <CustomGridElement>
            <Typography variant="h4" align="center" color="grey.100">
              Diagnósticos
            </Typography>
            <Box m={4} mx={4}>
              <Typography variant="h6" color="grey.100">
                Ritmo sinusal
              </Typography>
              <Typography variant="h6" color="grey.100">
                Requiere verificación médica
              </Typography>
              <Typography variant="h6" color="grey.100">
                Trazado dentro de los limites
              </Typography>
              <Typography variant="h6" color="grey.100">
                Multiples anomalías
              </Typography>
            </Box>
          </CustomGridElement>
        </Grid>
      </Box>
    </Box>
  );
};

export default Projects;
