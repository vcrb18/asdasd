import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PatoGrid from "./PathologiesGrid";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData } from "../views/ExamsView";
import { getExam } from "../../service/user.service";

interface AnalisisProps {
  examId: number;
}

function urgencyColorSwitcher(value: number | undefined): string {
  switch (value) {
    case undefined:
      return "black";
    case 1:
      return "black";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "black";
  }
}

function stateColorSwitcher(value: boolean | undefined): string {
  switch (value) {
    case true:
      return "green";
    case false:
      return "red";
    default:
      return "red";
  }
}

const AnalisisBox: React.FC<AnalisisProps> = ({ examId }): JSX.Element => {
  const { t } = useTranslation();
  const [analisisData, setAnalisisData] = useState<ExamData>({
    exam_id: 0,
    patient_id: null,
    created_at: "",
    estado: false,
    urgencia: 1,
    resultados: "",
  });
  useEffect(() => {
    getExam(examId).then(
      (response) => {
        let data = {
          ...response.data,
          estado: response.data.estado.estado,
          resultados: "/examsview",
        };
        setAnalisisData(data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setAnalisisData(_content);
      }
    );
  }, []);
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      width={"80%"}
      height={"100%"}
      sx={{
        backgroundColor: "#F2FAFA",
        borderRadius: "1%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "2.5px solid #000000",
          borderRadius: "1%",
          padding: "2%",
        }}
        width={"45%"}
        margin={"3%"}
      >
        <Typography fontSize={"80%"} width={"100%"} sx={{ color: "#000000" }}>
          Análisis
        </Typography>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Estado
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={"80%"}
              color={stateColorSwitcher(analisisData.estado)}
            >
              {analisisData.estado === true ? "Aceptado" : "Rechazado"}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Urgencia
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"}>
            <Typography
              fontSize={"80%"}
              color={urgencyColorSwitcher(analisisData?.urgencia)}
            >
              {analisisData?.urgencia?.toString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"1%"}
        >
          {/* <Grid item xs={12} sm={12} md={12} lg={12} marginX={"2%"}>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Patologías
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} marginX={"2%"}>
            <PatoGrid />
          </Grid> */}
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "2.5px solid #000000",
          borderRadius: "1%",
          padding: "2%",
        }}
        margin={"3%"}
        width={"45%"}
      >
        <DiagnosisComponent examId={examId} />
      </Box>
    </Box>
  );
};

export default AnalisisBox;
