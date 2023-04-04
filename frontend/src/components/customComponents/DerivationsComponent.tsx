import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import FiducialChart from "./FiducialChart";
import FiducialMeasurementsTable from "./FiducialMeasurements";
import { getExamPredictedMarkers } from "../../service/user.service";

interface DerivationsProps {
  examId: number; 
}

interface Fiduciales {
  p_start: number;  // fidP
  qrs_start: number;  // fidQRS
  r: number;  // fidR
  qrs_end: number;  // fidS
  t_start: number;  // fidT
  t_end: number; // fidST
  r2: number;  // fidR2
}

const DerivationsComponent: React.FC<DerivationsProps> = ({examId}): JSX.Element => {
  // TODO: consumir puntos reales
  const [fidP, setFidP] = React.useState(1500);
  const [fidQRS, setFidQRS] = React.useState(1700);
  const [fidR, setFidR] = React.useState(1870);
  const [fidR2, setFidR2] = React.useState(2760);
  const [fidS, setFidS] = React.useState(1900);
  const [fidST, setFidST] = React.useState(2000);
  const [fidT, setFidT] = React.useState(2100);
  const [fiduciales,setFiduciales] = React.useState<Fiduciales>({
    p_start: 0,  // fidP
    qrs_start: 0,  // fidQRS
    r: 0,  // fidR
    qrs_end: 0,
    t_start: 0,
    t_end: 0,
    r2: 0,
  });
  useEffect(()=> {
    getExamPredictedMarkers(examId).then(
      (response) => {
        // console.log(response.data)
        setFidP(response.data.p_start)
        setFidQRS(response.data.qrs_start)
        setFidR(response.data.r)
        setFidR2(response.data.r2)
        setFidS(response.data.qrs_end)
        setFidST(response.data.t_start)
        setFidT(response.data.t_end) 
      }

      //   setFiduciales({
      //     ...response.data
      //   })
      // }
    )
  }
  )

  // : React.FC<Predicciones> = ({predicciones}): JSX.Element => {
  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="left"
      width={"80%"}
      spacing={1}
    >
      <Typography
        align="left"
        fontSize={"80%"}
        width={"100%"}
        sx={{ color: "#000000" }}
      >
        Derivaciones
      </Typography>

      <Box
        sx={{ backgroundColor: "#FFFFFF", border: 2, borderColor: "#DDDDDD" }}
      >
        <FiducialChart
          fidP={fidP}
          fidQRS={fidQRS}
          fidR={fidR}
          fidR2={fidR2}
          fidS={fidS}
          fidST={fidST}
          fidT={fidT}
        />
      </Box>

      <Box>
        <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              console.log("Boton restaurar");
            }}
          >
            Restaurar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("Boton guardar cambios");
            }}
          >
            Guardar cambios
          </Button>
        </Stack>
      </Box>

      <Typography
        align="left"
        fontSize={"80%"}
        width={"100%"}
        sx={{ mt: 1, color: "#000000" }}
      >
        Valores
      </Typography>

      <Box sx={{ border: 2, borderColor: "#DDDDDD" }}>
        <FiducialMeasurementsTable
          fidP={fidP}
          fidQRS={fidQRS}
          fidR={fidR}
          fidR2={fidR2}
          fidS={fidS}
          fidST={fidST}
          fidT={fidT}
          // fidP={fiduciales.p_start}
          // fidQRS={fiduciales.qrs_start}
          // fidR={fiduciales.r}
          // fidR2={fiduciales.r2}
          // fidS={fiduciales.qrs_end}
          // fidST={fiduciales.t_end}
          // fidT={fiduciales.t_start}
          examId={examId}
        />
      </Box>
    </Stack>
  );
};

export default DerivationsComponent;
