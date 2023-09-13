import { useTranslation } from 'react-i18next';

import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';

import { projectsDetails, projectsDiagnosticsNames } from '@/utils/constants/landing/index';

const CustomGridElement = ({ children }: { children: JSX.Element[] }) => (
  <Grid item xs={12} lg={6}>
    <Paper sx={{ height: '100%', bgcolor: 'primary.main', px: 2 }} variant="outlined">
      {children}
    </Paper>
  </Grid>
);

function Projects() {
  const { t } = useTranslation();

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
          {t('landing.projects.title')}
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
          {projectsDetails.map((project) => (
            <CustomGridElement>
              <Typography variant="h4" align="center" color="grey.100">
                {t(project.title)}
              </Typography>
              <Avatar src={project.image} alt={project.alt} variant="square" sx={imagesStyle} />
            </CustomGridElement>
          ))}
          <CustomGridElement>
            <Typography variant="h4" align="center" color="grey.100">
              {t('landing.projects.fourthProject.title')}
            </Typography>
            <Box m={4} mx={4}>
              {projectsDiagnosticsNames.map((diagnostic) => (
                <Typography variant="h6" color="grey.100">
                  {t(diagnostic.title)}
                </Typography>
              ))}
            </Box>
          </CustomGridElement>
        </Grid>
      </Box>
    </Box>
  );
}

export default Projects;
