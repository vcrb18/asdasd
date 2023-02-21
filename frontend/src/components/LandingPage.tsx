import React, { useState } from "react";
import Header from "../components/Header";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOnTabValueChange = (index: number): void => {
    setTabIndex(index);
  };

  return (
    <>
      <Header
        buttons={buttons}
        tabs={tabs}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
          handleOnTabValueChange(index);
        }}
      />

      <Box sx={{ padding: 2, maxWidth: "60%" }}>
        {tabIndex === 0 && (
          <Box>
            <Typography sx={{ fontSize: "4rem", color: "#404040" }}>
              Inteligencia Artificial para Cardiología
            </Typography>
            <Divider variant="fullWidth" />
            <Typography mt={10} sx={{ color: "#404040", fontSize: "1.4rem" }}>
              Bienvenido a ISATEC Heart, un equipo de investigación y desarrollo
              dedicado a explorar el potencial de la inteligencia artificial
              (IA) en el campo de la cardiología.
            </Typography>
            <Typography mt={5} sx={{ color: "#404040", fontSize: "1.4rem" }}>
              Nuestro equipo se centra en desarrollar herramientas y tecnologías
              de IA de vanguardia para ayudar a mejorar el diagnóstico,
              tratamiento y manejo de las enfermedades del corazón. A través de
              nuestra investigación, buscamos ampliar los límites de lo que es
              posible en el campo de la cardiología y contribuir al avance de la
              ciencia médica.
            </Typography>
            <Typography
              mt={10}
              sx={{
                textAlign: "left",
                fontSize: "2.5rem",
                color: "#404040",
                fontWeight: "bold",
              }}
            >
              Nuestros Proyectos
            </Typography>
            <Divider variant="fullWidth" />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{marginTop: "1%"}}
            >
              <Grid item xs={6}>
                <Paper>1</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>2</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>3</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>4</Paper>
              </Grid>
            </Grid>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography>Render Component 2</Typography>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography>Render Component 3</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LandingPage;
