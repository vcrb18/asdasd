import { Box, Typography } from "@mui/material";
import React from "react";

interface Prediccion {
  id: "Estado" | "Urgencia" | "Arritmia" | "Tipo" | "Extrasistole" | "Bloqueo";
  estado: string;
  porcentaje: string;
}

const predicciones: readonly Prediccion[] = [
  { id: "Estado", estado: "Aceptado", porcentaje: "98%" },
  { id: "Urgencia", estado: "Normal", porcentaje: "87%" },
  { id: "Arritmia", estado: "Positivo", porcentaje: "78%" },
];

const DiagnosticosSugeridos = [
  { diagnostico: "Trasado dentro de los limites", porcentaje: "90%" },
  { diagnostico: "Ritmo Sinusal", porcentaje: "91%" },
];

const PredictionBox = (): JSX.Element => {
  // : React.FC<Predicciones> = ({predicciones}): JSX.Element => {
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Typography fontSize={"80%"} color={"#000000"}>
        Predicción de Patologías
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        {predicciones.map((prediccion) => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            key={prediccion.id}
          >
            <Box  margin={"1%"}>
              <Typography fontSize={"80%"} color={"#000000"}>
                {prediccion.id}
              </Typography>
            </Box>
            <Box  margin={"1%"}>
              <Typography fontSize={"80%"} color={"#000000"}>
                {prediccion.estado}
              </Typography>
            </Box>
            <Box  margin={"1%"}>
              <Typography fontSize={"80%"} color={"#000000"}>
                {prediccion.porcentaje}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Typography color={"#000000"} fontSize={"80%"} width={"100%"}>
        Diagnosticos sugeridos
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        {DiagnosticosSugeridos.map((diagnostico) => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            key={diagnostico.diagnostico}
          >
            <Box width={"70%"} marginLeft={"5%"}>
              <Typography fontSize={"80%"} color={"#000000"}>
                {diagnostico.diagnostico}
              </Typography>
            </Box>
            <Box width={"30%"}>
              <Typography fontSize={"80%"} color={"#000000"}>
                {diagnostico.porcentaje}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PredictionBox;
