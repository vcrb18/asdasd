import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

import FiducialChart from './FiducialChart';
import FiducialMeasurementsTable from './FiducialMeasurements';


const DerivationsComponent = (): JSX.Element => {

    // TODO: consumir puntos reales
    const [fidP, setFidP] = React.useState(1500);
    const [fidQRS, setFidQRS] = React.useState(1700);
    const [fidR, setFidR] = React.useState(1870);
    const [fidR2, setFidR2] = React.useState(2760);
    const [fidS, setFidS] = React.useState(1900);
    const [fidST, setFidST] = React.useState(2000);
    const [fidT, setFidT] = React.useState(2100);


  // : React.FC<Predicciones> = ({predicciones}): JSX.Element => {
  return (
      <Stack display={"flex"} flexDirection={"column"} alignItems="left" width={"80%"} spacing={1}>
          <Typography align="left" fontSize={"80%"} width={"100%"} sx={{ color: "#000000" }}>
              Derivaciones
          </Typography>

          <Box sx={{backgroundColor: "#FFFFFF", border: 2, borderColor: "#DDDDDD"}}>
              <FiducialChart fidP={fidP} fidQRS={fidQRS} fidR={fidR} fidR2={fidR2} fidS={fidS} fidST={fidST} fidT={fidT}/>
          </Box>

          <Box>
              <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                  <Button variant="contained" onClick={() => { console.log("Boton restaurar"); }}>
                      Restaurar
                  </Button>
                  <Button variant="contained" onClick={() => { console.log("Boton guardar cambios"); }}>
                      Guardar cambios
                  </Button>
              </Stack>

          </Box>

          <Typography align="left" fontSize={"80%"} width={"100%"} sx={{ mt: 1, color: "#000000" }}>
              Valores
          </Typography>

          <Box sx={{ border: 2, borderColor: "#DDDDDD" }}>
              <FiducialMeasurementsTable fidP={fidP} fidQRS={fidQRS} fidR={fidR} fidR2={fidR2} fidS={fidS} fidST={fidST} fidT={fidT}/>
          </Box>
      
    </Stack>
  );
};

export default DerivationsComponent;
