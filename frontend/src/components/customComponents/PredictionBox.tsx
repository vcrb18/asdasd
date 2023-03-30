import { Box, Grid, Typography } from "@mui/material";
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
  value: string
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
    if (num <= 50)
    	return "red";
    else if(num<=75)
      return "orange";
    return("green")
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
  let idEstado = "Estado";
  let estadoEstado = "";
  let porcentajeEstado = "";
  const prediccionPrimeraFila = patologiasEstado.map((patologiaEstado:Patologias) => {
    // let idEstado = "Aceptado/Rechazado";
    // let estadoEstado = "";
    // let porcentajeEstado = "";
    if (patologiaEstado.value_type === "bool") {
      if (patologiaEstado.value === "true") {
        estadoEstado = "Aceptado"; // O ES RECHAZADO?
      } else {
        estadoEstado = "Rechazado"
      }
    } else if (patologiaEstado.value_type === "float") {
        porcentajeEstado = patologiaEstado.value;
    } else if (patologiaEstado.value_type === "string") {
      porcentajeEstado = patologiaEstado.value;
    }
    return { id: idEstado, estado: estadoEstado, porcentaje: porcentajeEstado } as Prediccion;
  })
  const primeraFilaSinMap = { id: idEstado, estado: estadoEstado, porcentaje: porcentajeEstado };
  prediccionesVini.push(primeraFilaSinMap);

  const patologiasArritmia = patologias.filter(item => item.algorithm_type_id === 2);
  let idArritmia = "Arritmia";
  let estadoArritmia = "";
  let porcentajeArritmia = "";
  const prediccionSegundaFila = patologiasArritmia.map((patologiaArritmia:Patologias) => {
    // let idArritmia = "Arritmia";
    // let estadoArritmia = "";
    // let porcentajeArritmia = "";
    if (patologiaArritmia.value_type === "bool") {
      if (patologiaArritmia.value === "true") {
        estadoArritmia = "Positivo"; // O ES RECHAZADO?
      } else {
        estadoArritmia = "Negativo";
      }
    } else if (patologiaArritmia.value_type === "float") {
        porcentajeArritmia = patologiaArritmia.value;
    }
    return { id: idArritmia, estado: estadoArritmia, porcentaje: porcentajeArritmia }
  })
  const segundaFilaSinMap = { id: idArritmia, estado: estadoArritmia, porcentaje: porcentajeArritmia };
  prediccionesVini.push(segundaFilaSinMap);


  const patologiasExtrasistole = patologias.filter(item => item.algorithm_type_id === 4);
  let idExtrasistole = "Extrasistole";
  let estadoExtrasistole = "";
  let porcentajeExtrasistole = "";
  const prediccionTerceraFila = patologiasExtrasistole.map((patologiaExtrasistole:Patologias) => {
    // let idExtrasistole = "Extrasistole";
    // let estadoExtrasistole = "";
    // let porcentajeExtrasistole = "";
    if (patologiaExtrasistole.value_type === "bool") {
      if (patologiaExtrasistole.value === "true") {
        estadoExtrasistole = "Positivo";
      } else {
        estadoExtrasistole = "Negativo";
      }
    } 
    else if (patologiaExtrasistole.value_type === "float") {
        porcentajeExtrasistole = patologiaExtrasistole.value;
    }
    return { id: idExtrasistole, estado: estadoExtrasistole, porcentaje: porcentajeExtrasistole }
  })
  const terceraFilaSinMap = { id: idExtrasistole, estado: estadoExtrasistole, porcentaje: porcentajeExtrasistole };
  prediccionesVini.push(terceraFilaSinMap);


  const patologiasInfarto = patologias.filter(item => item.algorithm_type_id === 5);
  let idInfarto = "Infarto";
  let estadoInfarto = "";
  let porcentajeInfarto = "";
  const prediccionCuartaFila = patologiasExtrasistole.map((patologiaInfarto:Patologias) => {
    // let idInfarto = "Extrasistole";
    // let estadoInfarto = "";
    // let porcentajeInfarto = "";
    if (patologiaInfarto.value_type === "bool") {
      if (patologiaInfarto.value === "true") {
        estadoInfarto = "Positivo";
      } else {
        estadoInfarto = "Negativo";
      }
    } 
    else if (patologiaInfarto.value_type === "float") {
        porcentajeInfarto = patologiaInfarto.value;
    }
    return { id: idInfarto, estado: estadoInfarto, porcentaje: porcentajeInfarto }
  })
  const cuartaFilaSinMap = { id: idInfarto, estado: estadoInfarto, porcentaje: porcentajeInfarto };
  prediccionesVini.push(cuartaFilaSinMap);


  const patologiasBloqueo = patologias.filter(item => item.algorithm_type_id === 6);
  let idBloqueo = "Bloqueo";
  let estadoBloqueo = "";
  let porcentajeBloqueo = "";
  const prediccionQuintaFila = patologiasBloqueo.map((patologiaBloqueo:Patologias) => {
    // let idBloqueo = "Bloqueo";
    // let estadoBloqueo = "";
    // let porcentajeBloqueo = "";
    if (patologiaBloqueo.value_type === "bool") {
      if (patologiaBloqueo.value === "true") {
        estadoBloqueo = "Positivo"; // O ES RECHAZADO?
      } else {
        estadoBloqueo = "Negativo";
      }
    } else if (patologiaBloqueo.value_type === "float") {
        porcentajeBloqueo = patologiaBloqueo.value;
    }
    return { id: idBloqueo, estado: estadoBloqueo, porcentaje: porcentajeBloqueo }
  })
  const quintaFilaSinMap = { id: idBloqueo, estado: estadoBloqueo, porcentaje: porcentajeBloqueo };
  prediccionesVini.push(quintaFilaSinMap);
  const predicciones: readonly Prediccion[] = prediccionesVini;

  // BORRADOR VINI //////////////////////////////////////////////////


  // const predicciones: readonly Prediccion[] = [
  //   { id: "Estado", estado: "Aceptado", porcentaje: "98%" },
  //   { id: "Arritmia", estado: "Positivo", porcentaje: "78%" },
  //   { id: "Urgencia", estado: "Normal", porcentaje: "87%" },
  // ];
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
            <Grid container
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              key={prediccion.id}
            >
              <Grid item margin={"1%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {prediccion.id}
                </Typography>
              </Grid>
              <Grid item margin={"1%"}>
                <Typography fontSize={"80%"} color={"#000000"}>
                  {prediccion.estado}
                </Typography>
              </Grid>
              <Grid item margin={"1%"}>
                <Typography fontSize={"80%"} color={colorSwitcher(prediccion.porcentaje)}>
                  {prediccion.porcentaje}
                </Typography>
              </Grid>
            </Grid>
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
