import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem, Box, Grid, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import PatoGrid from "./PathologiesGrid";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData } from "../views/ExamsView";
import { getExam } from "../../service/user.service";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"

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
    operator_review: false,
    aceptado: true
  });
  useEffect(() => {
    getExam(examId).then(
      (response) => {
        let data = {
          ...response.data,
          estado: response.data.aceptado,
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
    const getReviewState = (state: boolean) : JSX.Element => {
    if (state === true) {
      return(
        <Grid item display={"flex"} justifyContent={"center"} xs={12} sm={12} md={2} lg={2} >
          <Avatar src={Check} alt={"checkVerde"} variant={"square"} sx={{width: "85%", height: "85%"}}/>
        </Grid>
      )
    } else {
      return (
        <Grid display={"flex"} justifyContent={"center"} xs={12} sm={12} md={2} lg={2}>
          <Avatar src={X} alt={"checkRojo"} variant={"square"} sx={{width: "85%", height: "85%"}}/>
        </Grid>
        )
    }
  }
  return (
    <Grid container
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      
    >
      <Grid item>
        {/* Titulo de análisis */}
        <Typography fontSize={"150%"} fontWeight={"bold"}>
        {t("analysis")}
        </Typography>
      </Grid>
        {/* Estado */}
        <Grid
          container
          display={"flex"}
        >
          <Grid item  
            xs={12} sm={12} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"80%"}>
            {t("state")}
            </Typography>
          </Grid>
          <Grid container xs={12} sm={12} md={7} lg={7}>
            {getReviewState(analisisData.estado)}
            <Grid item
              xs={12} sm={12} md={2} lg={2}>
                
            </Grid>
          <Grid item 
            xs={12} sm={12} md={4} lg={4}>
              
          </Grid>
        </Grid>
        </Grid>
        {/* Urgencia */}
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Grid item xs={12} sm={12} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"80%"}>
            {t("urgency")}
            </Typography>
          </Grid>
          <Grid container xs={12} sm={12} md={7} lg={7}>
            {getReviewState(analisisData.estado)}
            <Grid item
              xs={12} sm={12} md={2} lg={2}>
                
            </Grid>
          <Grid item 
            xs={12} sm={12} md={4} lg={4}>
              
          </Grid>
            <Typography
              fontSize={"80%"}
              color={urgencyColorSwitcher(analisisData.urgencia)}
            >
              {analisisData.urgencia}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default AnalisisBox;
