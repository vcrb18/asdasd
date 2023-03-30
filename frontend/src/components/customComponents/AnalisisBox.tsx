import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PatoGrid from "./PathologiesGrid";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData } from "../views/ExamsView";
import { getExam } from "../../service/user.service";


interface AnalisisProps{
  examId: number;
}

const AnalisisBox: React.FC<AnalisisProps> = ({examId}): JSX.Element => {
  const { t } = useTranslation();
  const [analisisData, setAnalisisData] = useState<ExamData>();
  useEffect(() => {
    getExam(examId).then((response) =>{
      setAnalisisData(response.data)
    }, 
    (error) => {
        const _content = (error.response && error.response.data) || error.message || error.toString();
        setAnalisisData(_content);
      }
    )
  }, []);
    // let nivelDeUrgencia: string = analisisData?.urgencia;
  
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={'center'}
      width={"80%"}
      height={"100%"}
      sx={{ backgroundColor: "#159194", borderRadius: "2%" }}
    >
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
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
          <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              Estado
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
          <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              {analisisData?.urgencia}
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
      <Box sx={{ backgroundColor: "#fff", borderRadius: "2%" }} margin={"3%"}>
        <DiagnosisComponent examId={examId} />
      </Box>
    </Box>
  );
}

export default AnalisisBox;