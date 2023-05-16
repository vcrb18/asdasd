import { Box, Button, Fab, Grid, Paper, TextField, ThemeProvider, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";
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
  markExamIdAsLocked,
  markExamIdAsUnlocked,
  putExamReview, putExamUnreview
} from "../../service/user.service";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import DiagnosisComponent from "../customComponents/DiagnosisComponent";

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
  examId: number;
  patientId: string | null;
  createdAt: string;
  status: boolean;
  accepted: boolean;
  urgency: number;
  results: string;
  operatorReview: boolean;
  operatorAccept: boolean | null;
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
  const [isLocked, setIsLocked] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [reloadTime, setReloadTime] = useState<number>();

  useEffect(
    () => {
      //llamar función que hace la request para bloquear posiblemente con algún setTimeout para que se repita cada cierto tiempo
      markExamIdAsLocked(examIdNumber).then(
        (response) => {
          setIsLocked(false);
          console.log("RESPONSE LOCKED = ", response);
        },
        (error) => {
          if(error.response.status === 423){
            console.log("RESPONSE ERROR = ", error.response.data);
            setIsLocked(true);
            const timeRemaining = error.response.data.timeRemaining;
            const expTime = new Date(timeRemaining);
            const asTimestamp = new Date(error.response.data.asTimestamp);
            const msg = `Este examen está siendo visualizado por ${error.response.data.lockedBy}, el bloqueo expirará a las ${expTime.toLocaleTimeString()} a menos que 
            ${error.response.data.lockedBy} lo prolongue o lo deje de visualizar.`
            setErrorMessage(msg);
            setReloadTime(asTimestamp.getTime());
            console.log("RELOAD TIME = ", reloadTime);
          }
        }
      )
      return () => {
        //llamar función que hace la request para desbloquear
        markExamIdAsUnlocked(examIdNumber).then(
          (response) => {
            console.log("RESPONSE UNLOCKED: ", response);
          },
          (error) => {
            console.error('Error al liberar el bloqueo:', error);
          }
        );
      }
  }, []);
  
  useEffect(() => {
    if(isLocked){
      const timeoutId = setTimeout(()=>{
        navigate(0);
      }, reloadTime);
      console.log("Se setea el timeout con id = ", timeoutId);
      return () => clearTimeout(timeoutId);
    } else{
      const intervalId = setInterval(()=>{
        markExamIdAsLocked(examIdNumber);
      }, 55000);
      console.log("Se setea el interval con id = ", intervalId);

      return () => clearInterval(intervalId);
    }

  }, [isLocked]);

  useEffect(() => {
    getExam(examIdNumber).then(
      (response) => {
        setExamData({
          examId: response.data.exam_id,
          patientId: response.data.patient_id,
          createdAt: response.data.created_at,
          status: response.data.estado,
          accepted: response.data.aceptado,
          urgency: response.data.urgencia,
          results: response.data.resultados,
          operatorReview: response.data.operator_review,
          operatorAccept: response.data.operator_accept,
        });
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

    const validationButtonMessage: string = (validated) ? t("undoValidation") : t("validateMeasurements");
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

  const fecha = examData?.createdAt.includes("T")
    ? examData?.createdAt.replace("T", " ").split(".")[0]
    : examData?.createdAt.split(".");

  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#006a6b",
      },
    },
  });
  const theme = useTheme();
  
  const isMatchXs = useMediaQuery(theme.breakpoints.down("md"));

  const navigate: NavigateFunction = useNavigate();

  
  const handleGoBack = (): void => {
    markExamIdAsUnlocked(examIdNumber).then(
      (response) => {
        console.log("RESPONSE UNLOCKED: ", response);
        setIsLocked(false);
      },
      (error) => {
        console.error('Error al liberar el bloqueo:', error);
      }
    );
    navigate("/exams");
  };

  if (isLocked && !isMatchXs){
    return(
      <>
        <Header
          tabs={tabs}
          buttons={buttons}
          headerPositionLg="sticky"
          headerPositionMd="sticky"
          headerPositionXs="sticky"
          onTabValueChange={(index: number) => {
            console.log(`Exams: Tab index changed to ${index}`);
          }}
        />
        {/* Grid que contiene todo lo de la vista del examen */}
        <Grid container marginY={"1%"} width={"100%"} 
          >
          {/* Contenedor del boton para volver a la tabla de exámenes*/}
          <Grid item xs={6} sm={6} md={2} lg={2} width={"80%"} >
            <ThemeProvider theme={buttonsTheme}>
              <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{
                position: "fixed",
                left: "2%",
                width: "10%",
                backgroundColor: '#007088',
                color: "#fff", // Set a fixed width for the button, // Use shorthand notation for marginLeft
              }}
              >
                <Typography color="#ffffff" fontWeight={"bold"} >
                  {t("goBack")}
                </Typography>
              </Button>
            </ThemeProvider>
          </Grid>

        {/* Grid que contiene la parte de la informacion del examen */}
        <Grid container display={"flex"}  mb={"4%"} item xs={12} sm={12} md={8} lg={8} flexDirection={"column"}>
          {/* Grid que contiene la información del examen (incluyendo el análisis de este) */}
          <Grid container display={"flex"} justifyContent={"space-around"} >
            <Grid container xs={12} sm={12} md={5} lg={5} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
            {errorMessage}
            </Grid>
            </Grid>
            </Grid>

      </Grid>
      <div style={{width: "100%", bottom: 0, position: "relative"}}>
      <Footer 
        footerPositionLg="sticky"
        footerPositionMd="sticky"
        footerPositionXs="sticky" />
        </div>
      </>
      )
  }
  else if (isLocked && isMatchXs){
    return(
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
        {/* Grid que contiene todo lo de la vista del examen */}
        <Grid container marginY={"1%"} width={"100%"} display={"flex"} alignItems={"center"}
          >
          {/* Contenedor del boton para volver a la tabla de exámenes*/}
          <Grid item xs={6} sm={6} md={2} lg={2} width={"80%"} marginBottom={"1%"}>
            <ThemeProvider theme={buttonsTheme}>
              <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{
                backgroundColor: '#007088',
                color: "#fff",
                width: "80%", // Set a fixed width for the button, // Use shorthand notation for marginLeft
              }}
              >
                <Typography color="#ffffff" fontWeight={"bold"} >
                  {t("goBack")}
                </Typography>
              </Button>
            </ThemeProvider>
          </Grid>

        {/* Grid que contiene la parte de la informacion del examen */}
        <Grid container display={"flex"}  mb={"4%"} item xs={12} sm={12} md={8} lg={8} flexDirection={"column"}>
          {/* Grid que contiene la información del examen (incluyendo el análisis de este) */}
          <Grid container display={"flex"} justifyContent={"space-around"} >
            <Grid container xs={12} sm={12} md={5} lg={5} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
            {errorMessage}
            </Grid>
            </Grid>
            </Grid>

      </Grid>
      </>
      )
  }

  else if (isMatchXs){
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
      {/* Grid que contiene todo lo de la vista del examen */}
      <Grid container marginY={"1%"} width={"100%"} display={"flex"} alignItems={"center"}
        >
        {/* Contenedor del boton para volver a la tabla de exámenes*/}
        <Grid item xs={6} sm={6} md={2} lg={2} width={"80%"} marginBottom={"1%"}>
        <ThemeProvider theme={buttonsTheme}>
          <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            backgroundColor: '#007088',
            color: "#fff",
            width: "80%", // Set a fixed width for the button, // Use shorthand notation for marginLeft
          }}
          >
            <Typography color="#ffffff" fontWeight={"bold"} >
              {t("goBack")}
            </Typography>
          </Button>
        </ThemeProvider>
        </Grid>
        {/* Contenedor del botón de validación */}
        <Grid item xs={6} sm={6} md={2} lg={2} marginBottom={"1%"}>
          <ThemeProvider theme={buttonsTheme}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#007088',
                color: "#fff",
                width: "80%", // Set a fixed width for the button, // Use shorthand notation for marginLeft
              }}
              onClick={toggleValidatedExam}
              >
              <Typography fontStyle={"bold"} color={"#ffffff"}>
                {validationButtonMessage}
              </Typography>
            </Button>
          </ThemeProvider>
        </Grid>
        {/* Grid que contiene la parte de la informacion del examen */}
        <Grid container display={"flex"}  mb={"4%"} item xs={12} sm={12} md={8} lg={8} flexDirection={"column"}>
          {/* Grid que contiene la información del examen (incluyendo el análisis de este) */}
          <Grid container display={"flex"} justifyContent={"space-around"} >
            <Grid container xs={12} sm={12} md={5} lg={5} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
                <AnalisisBox examId={examIdNumber} />
              </Grid>
            <Grid container xs={12} sm={12} md={6} lg={6} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
                <DiagnosisComponent examId={examIdNumber}/>
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
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            marginY={"5%"}
          >
            <DerivationsComponent examId={examIdNumber} />
          </Grid>
         
          <Grid item
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            marginBottom={"3%"}
            width={"100%"}
            marginX={"3%"}
          >
            <Box display={"flex"} alignItems={"flex-start"}>
              <Typography fontSize={"80%"} fontWeight={"bold"}>
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
        </Grid>
      </Grid>

      </Grid>


     
    </Grid>
    </>
  );
}

  else {
    return(
    <>
      <Header
        tabs={tabs}
        buttons={buttons}
        headerPositionLg="sticky"
        headerPositionMd="sticky"
        headerPositionXs="sticky"
        onTabValueChange={(index: number) => {
          console.log(`Exams: Tab index changed to ${index}`);
        }}
      />
      {/* Grid que contiene todo lo de la vista del examen */}
      <Grid container marginY={"1%"} width={"100%"} 
        >
        {/* Contenedor del boton para volver a la tabla de exámenes*/}
        <Grid item xs={6} sm={6} md={2} lg={2} width={"80%"} >
        <ThemeProvider theme={buttonsTheme}>
          <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            position: "fixed",
            left: "2%",
            width: "10%",
            backgroundColor: '#007088',
            color: "#fff", // Set a fixed width for the button, // Use shorthand notation for marginLeft
          }}
          >
            <Typography color="#ffffff" fontWeight={"bold"} >
              {t("goBack")}
            </Typography>
          </Button>
        </ThemeProvider>
        </Grid>
        {/* Grid que contiene la parte de la informacion del examen */}
        <Grid container display={"flex"}  mb={"4%"} item xs={12} sm={12} md={8} lg={8} flexDirection={"column"}>
          {/* Grid que contiene la información del examen (incluyendo el análisis de este) */}
          <Grid container display={"flex"} justifyContent={"space-around"} >
            <Grid container xs={12} sm={12} md={5} lg={5} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
                <AnalisisBox examId={examIdNumber} />
              </Grid>
            <Grid container xs={12} sm={12} md={6} lg={6} padding={"2%"}
              sx={{
                border: 4,
                borderColor: "#E4EDEF",
                borderRadius: "1%",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
                <DiagnosisComponent examId={examIdNumber}/>
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
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            marginY={"5%"}
          >
            <DerivationsComponent examId={examIdNumber} />
          </Grid>
          <Grid item
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            marginBottom={"3%"}
            width={"100%"}
            marginX={"3%"}
          >
            <Box display={"flex"} alignItems={"flex-start"}>
              <Typography fontSize={"80%"} fontWeight={"bold"}>
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
        </Grid>
      </Grid>

      </Grid>


      {/* Contenedor del botón de validación */}
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <ThemeProvider theme={buttonsTheme}>
          <Button
            variant="contained"
            sx={{
              position: "fixed",
              right: "2%",
              width: "10%",
              backgroundColor: '#007088',
              color: "#fff",// Set a fixed width for the button, // Use shorthand notation for marginLeft
            }}
            onClick={toggleValidatedExam}
            >
            <Typography fontStyle={"bold"} color={"#ffffff"}>
              {validationButtonMessage}
            </Typography>
          </Button>
        </ThemeProvider>
      </Grid>
    </Grid>
    <div style={{width: "100%", bottom: 0, position: "relative"}}>
    <Footer 
      footerPositionLg="sticky"
      footerPositionMd="sticky"
      footerPositionXs="sticky" />
      </div>
    </>
    )
  }
}
;

export default ExamsView;
