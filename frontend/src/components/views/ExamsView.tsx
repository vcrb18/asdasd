import { Box, Button, Fab, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PredictionBox from "../customComponents/PredictionBox";
import AnalisisBox from "../customComponents/AnalisisBox";
import DerivationsComponent from "../customComponents/DerivationsComponent";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  getExam,
  getExamPredictedMarkersComputations,
  putExamReview, putExamUnreview
} from "../../service/user.service";
import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

interface ExamsViewProps {
  // examId: number ;
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string; href: string }>;
}

interface PredictedValuesData {
  exam_id: number;
  fc: number;
  rr: number;
  pq: number;
  qrs: number;
  qt: number;
  qtc: number;
  st: number;
}

export interface ExamData {
  exam_id: number;
  patient_id: string | null;
  created_at: string;
  estado: boolean;
  aceptado: boolean;
  urgencia: number;
  resultados: string;
  operator_review: boolean;
}
const ExamsView: React.FC<ExamsViewProps> = ({
  buttons,
  tabs,
}): JSX.Element => {
  const { t } = useTranslation();
  const { examId } = useParams<{ examId: string }>();
  const examIdNumber = parseInt(examId || "0", 10);
  const [examData, setExamData] = useState<ExamData>();
  const [validated, setValidated] = useState<boolean>();

  useEffect(() => {
    getExam(examIdNumber).then(
      (response) => {
        setExamData(response.data);
            setValidated(response.data?.operator_review);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setExamData(_content);
      }
    );
  }, []);

    const validationButtonMessage: string = (validated) ? 'Deshacer validación' : 'Validar mediciones';
    const toggleValidatedExam = (): void => {
        if (validated) {
            putExamUnreview(examIdNumber).then((res) => {
                if (res.data.success) {
                    setValidated(!validated);
                }
            });
        }
        else {
            putExamReview(examIdNumber).then((res) => {
                if (res.data.success) {
                    setValidated(!validated);
                }
            });
        }
    };

  const fecha = examData?.created_at.includes("T")
    ? examData?.created_at.replace("T", " ").split(".")[0]
    : examData?.created_at.split(".");

  return (
    <>
      <Header
        tabs={tabs}
        buttons={buttons}
        headerPositionLg="relative"
        headerPositionMd="relative"
        headerPositionXs="sticky"
        onTabValueChange={(index: number) => {
          console.log(`Exams: Tab index changed to ${index}`);
        }}
      />
      {/* Box que contiene todo lo de la vista del examen */}
      <Box marginY={"6%"} width={"100%"}>
        {/* Grid que contiene la parte de la informacion del examen */}
        <Grid container display={"flex"} mt={"1%"} mb={"4%"}>
          {/* Grid que contiene la flecha para volver a la tabla de examenes */}
          <Grid item xs={12} sm={12} md={1} lg={1}>
            <Fab size="small" href="/mainmenu">
              <ArrowCircleLeftIcon />
            </Fab>
          </Grid>
          {/* Grid que contiene la información del examen (incluyendo el análisis de este) */}
          <Grid container xs={12} sm={12} md={3} lg={3} display={"flex"} flexDirection={"column"}>
            {/* Grid container que contiene el los datos del exámen */}
            <Grid container>
              {/* Grid item que contiene el título "Examen" */}
              <Grid item 
                display={"flex"}
                justifyContent={"center"} 
                xs={12} sm={12} md={12} lg={12} >
                <Typography 
                  fontSize={"150%"}
                  fontWeight={"bold" }>
                  {t("exam")}
                </Typography>
              </Grid>
              {/* Grid container que contiene el numero de folio */}
              <Grid container>
                <Grid item
                  display={"flex"}
                  justifyContent={"center"} 
                  xs={12} sm={12} md={6} lg={6}
                >
                  <Typography
                    fontSize={"100%"}
                    fontWeight={"bold"}
                    >
                      {t("folio")}:
                    </Typography>
                </Grid>
                  <Grid item
                    xs={12} sm={12} md={6} lg={6}
                    >
                    <Typography 
                      fontSize={"100%"}
                      fontWeight={"bold"}
                      >
                      {examData?.exam_id.toString()}
                    </Typography>
                  </Grid>
              </Grid>
              {/* Grid container que contiene la fecha de creación */}
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography
                      fontSize={"100%"}
                      fontWeight={"bold"}
                    >
                      {t("date")}
                    </Typography>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography fontSize={"85%"} fontWeight={"bold"}>
                      {fecha}
                    </Typography>
                </Grid>

                </Grid>
              </Grid>
              {/* Grid que contiene el análisis del examen */}
              <Grid container>
                
              </Grid>
            </Grid>

          </Grid>
        </Grid>
          
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#006a6b", color: "#ffffff" }}
                          onClick={toggleValidatedExam}
            >{validationButtonMessage}
            </Button>
          </Grid>

        <Grid
          container
          display={"flex"}
          width={"100%"}
          rowSpacing={1}
          alignItems={"center"}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            padding={"2%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <AnalisisBox examId={examIdNumber} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginY={"5%"}
          >
            <DerivationsComponent examId={examIdNumber} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            padding={"2%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <PredictionBox examId={examIdNumber} />
          </Grid>
        </Grid>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        marginBottom={"3%"}
        width={"80%"}
        marginX={"3%"}
      >
        <Box display={"flex"} alignItems={"flex-start"}>
          <Typography fontSize={"80%"} color={"#000"}>
            {t("comments")}
          </Typography>
        </Box>
        <TextField
          id="outlined-multiline-static"
          label={t("commentsLabel")}
          multiline
          rows={4}
          fullWidth
        ></TextField>
      </Box>

    </>
  );
};

export default ExamsView;
