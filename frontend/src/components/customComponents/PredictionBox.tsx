import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getSuggestedDiagnostic, getExamAllAlgorithmPredictions } from "../../service/user.service";

interface Prediccion {
  // id: "Estado" | "Urgencia" | "Arritmia" | "Tipo" | "Extrasistole" | "Bloqueo";
  id: string;
  estado: string;
  porcentaje: string;
}

interface Patologias {
  prediction_id?: number,
  exam_id?: number,
  algorithm_type_id?: number,
  value_name?: string,
  value_type?: string,
  value?: string
}



interface PredictionProps {
  examId: number;
}

const PredictionBox: React.FC<PredictionProps> = ({ examId }): JSX.Element => {
  const [patologias, setPatologias] = useState<Patologias[]>([]);
  useEffect(() => {
    getExamAllAlgorithmPredictions(examId).then(
      (response) => {
        setPatologias(response.data)
      },
      (error) => {
        const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
        setPatologias(_content);
      }
    )
  }, []);
  
  function colorSwitcher(value: string): string {
    value = value.substring(0, value.length - 1);
    var num: number = +value;
    if (num <= 25)
    	return "red";
    else if(num<=50)
      return "yellow";
    else if(num<=70)
      return "orange";
    else if(num<=90)
      return "red";  
    return("black")
    }
  // const [DiagnosticosSugeridos, setDiagnosticoSugerido] = useState<SuggestedDiagnostic[]>([]);
  // useEffect(() => {
  //   getSuggestedDiagnostic(examId, 3).then(
  //     (res) => {
  //       setDiagnosticoSugerido(res.data)
  //     },
  //     (error) => {
  //       const _content =
  //       (error.response && error.response.data) ||
  //       error.message ||
  //       error.toString();
  //       setDiagnosticoSugerido(_content);
  //     }
  //   )
  // }, []);



  // BORRADOR VINI //////////////////////////////////////////////////
  

  
  
  const prediccionesVini: Prediccion[] = [];
  const patologiasEstado = patologias.filter(item => item.algorithm_type_id === 1);
  const prediccionPrimeraFila = patologiasEstado.map((patologiaEstado:Patologias) => {
    let id = "Aceptado/Rechazado";
    let estado = "";
    let porcentaje = "";
    if (patologiaEstado.value_type === "bool") {
      if (patologiaEstado.value === "true") {
        estado = "Aceptado"; // O ES RECHAZADO?
      } else {
        estado = "Rechazado"
      }
    }
    //  else if (patologiaEstado.value_type === "float") {
    //   porcentaje = patologiaEstado.value;
    // }
    return { id: id, estado: estado, porcentaje: porcentaje }
  })

  const patologiasArritmia = patologias.filter(item => item.algorithm_type_id === 2);
  const prediccionSegundaFila = patologiasArritmia.map((patologiaArritmia:Patologias) => {
    let id = "Arritmia";
    let estado = "";
    let porcentaje = "";
    if (patologiaArritmia.value_type === "bool") {
      if (patologiaArritmia.value === "true") {
        estado = "Positivo"; // O ES RECHAZADO?
      }
      // Puede no estar
    } 
    // else if (patologiaArritmia.value_type === "float") {
    //   porcentaje = patologiaArritmia.value;
    // }
    return { id: id, estado: estado, porcentaje: porcentaje }
  })

  const patologiasExtrasistole = patologias.filter(item => item.algorithm_type_id === 4);


  const patologiasInfarto = patologias.filter(item => item.algorithm_type_id === 5);


  const patologiasBloqueo = patologias.filter(item => item.algorithm_type_id === 6);



  // BORRADOR VINI //////////////////////////////////////////////////


  const predicciones: readonly Prediccion[] = [
    { id: "Estado", estado: "Aceptado", porcentaje: "98%" },
    { id: "Arritmia", estado: "Positivo", porcentaje: "78%" },
    { id: "Urgencia", estado: "Normal", porcentaje: "87%" },
  ];
  const fontColor = "#000";
  // : React.FC<Predicciones> = ({predicciones}): JSX.Element => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"80%"}
      sx={{ backgroundColor: "#159194", borderRadius: "2%" }}
    >
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
        <Typography fontSize={"80%"} color={fontColor} mt={"2%"}>
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
              <Box margin={"1%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {prediccion.id}
                </Typography>
              </Box>
              <Box margin={"1%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {prediccion.estado}
                </Typography>
              </Box>
              <Box margin={"1%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {prediccion.porcentaje}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
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
          {/* {DiagnosticosSugeridos.map((diagnostico) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              key={diagnostico.value}
            >
              <Box width={"70%"} marginLeft={"5%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {diagnostico.value}
                </Typography>
              </Box>
            </Box>
          ))} */}
        </Box>
      </Box>
    </Box>
  );
};

export default PredictionBox;
