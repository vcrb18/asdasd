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
  // let examData: ExamData = {
  //   exam_id: 1,
  //   patient_id: '',
  //   created_at: '',
  //   estado: false,
  //   urgencia: 1,
  //   resultados: '',
  // };
  // getExam(exam_id).then((response) => {
  //   examData = response.data;
  //   console.log("EL id del Examen es = ");
  // })

  const fecha = examData?.created_at.includes("T")
    ? examData?.created_at.replace("T", " ").split(".")[0]
    : examData?.created_at.split(".");

  return (
    <>
      <Header
        tabs={tabs}
        buttons={buttons}
        headerPosition="relative"
        onTabValueChange={(index: number) => {
          console.log(`Exams: Tab index changed to ${index}`);
        }}
      />
      <Box marginY={"6%"} width={"100%"}>
        <Grid container display={"flex"} mt={"1%"} mb={"4%"}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Fab size="small" href="/mainmenu">
              <ArrowCircleLeftIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ fontSize: "75%", color: "#061525", fontWeight: "bold" }}
              >
                <Typography
                  fontSize={"100%"}
                  color={"#061525"}
                  sx={{ fontWeight: "bold" }}
                >
                  {t("folioExam")}:
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: "75%",
                  color: "#061525",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <Typography fontSize={"85%"} color={"#061525"}>
                  {examData?.exam_id.toString()}
                </Typography>
              </Box>
            </Box>
            {/* <Typography
              fontSize={"75%"}
              color={"#061525"}
              sx={{ fontWeight: "bold" }}
            >
              Folio examen: {examData?.exam_id.toString()}
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ fontSize: "75%", color: "#061525", fontWeight: "bold" }}
              >
                <Typography
                  fontSize={"100%"}
                  color={"#061525"}
                  sx={{ fontWeight: "bold" }}
                >
                  {t("date")}
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: "75%",
                  color: "#061525",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <Typography fontSize={"85%"} color={"#061525"}>
                  {fecha}
                </Typography>
              </Box>
            </Box>
            {/* <Typography fontSize={"80%"} color={"#404040"}>
              Fecha: {fecha}
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#006a6b", color: "#ffffff" }}
                          onClick={toggleValidatedExam}
            >{validationButtonMessage}
            </Button>
          </Grid>
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
      {/* <Footer footerPosition={"static"} /> */}
    </>
  );
};

export default ExamsView;
