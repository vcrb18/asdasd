import { Box, Button, Fab, Grid, Paper, TextField, ThemeProvider, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";
import React, { Dispatch, useEffect, useState } from "react";
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
  putExamReview, putExamUnreview,
  getExamDataSistemed2,
  acceptExamSistemed2, rejectExamSistemed2,
  postMarkersSistemed2,
  DiagnosticSistemed2, postDiagnosticsSistemed2
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
  examId: number;
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
  rejectionId: number | null;
  rejectedDerivation: string | null;
}

export interface Background {
  id: number;
  name: string;
}
export interface Medication {
  id: number;
  name: string;
  dose: number;
}

export interface Symptom {
  id: number;
  name: string;
  dose: number;
}


export interface ExamMetadata {
  patientId: number;
  birthday: string;
  gender: string;
  backgrounds: Background[];
  medications: Medication[];
  symptoms: Symptom[];
}

export interface RejectionReason {
  id: number;
  reason: string;
}

export interface FiducialStates {
    fidP: number;
    setFidP: Dispatch<number>;
    fidQRS: number;
    setFidQRS: Dispatch<number>;
    fidR: number;
    setFidR: Dispatch<number>;
    fidR2: number;
    setFidR2: Dispatch<number>;
    fidS: number;
    setFidS: Dispatch<number>;
    fidST: number;
    setFidST: Dispatch<number>;
    fidT: number;
    setFidT: Dispatch<number>;
}

export interface Diagnostic {
    diagnosticId: number,
    diagnostic: string,
    order: number,
}

export interface DiagnosticPrediction {
  diagnosticId: number,
  diagnostic: string,
  order: number,
  accuracy: number,
}

export interface DoctorDiagnostic {
    examId: number,
    diagnosticId: number,
}

export interface DiagnosticStates {
    diagnosticosSugeridos: DiagnosticPrediction[];
    setDiagnosticosSugeridos: Dispatch<DiagnosticPrediction[]>;
    doctorDiagnostics: Diagnostic[];
    setDoctorDiagnostics: Dispatch<Diagnostic[]>;
}

export const rejectionReasons: RejectionReason[] = [
  {id: 1, reason: "DERIVACION INCOMPLETA"},
  {id: 2, reason: "examenes mal tomados"},
  {id: 3, reason: "ARTEFACTOS POR LINEA BASE FIBRILADA"},
  {id: 4, reason: "ARTEFACTOS"},
  {id: 5, reason: "CABLES INVERTIDOS"},
  {id: 6, reason: "DERIVACION PLANA"},
  {id: 7, reason: "EXAMEN REPETIDO"},
  {id: 8, reason: "EXAMEN TOMADO EN MENOS DE 10 SEGUNDOS"},
  {id: 9, reason: "DATOS INCOMPLETOS"},
  {id: 10, reason: "DATOS ERRONEOS"},
  {id: 11, reason: "TRAZADO DIFUSO"},
]

const ExamsView: React.FC<ExamsViewProps> = ({
  buttons,
  tabs,
}): JSX.Element => {
  const { t } = useTranslation();
  const { examId } = useParams<{ examId: string }>();
  const examIdNumber = parseInt(examId || "0", 10);

  const [examData, setExamData] = useState<ExamData | null>(null);
  const [isLoadingExamData, setIsLoadingExamData] = useState<boolean>(true);
  const [acceptedExam, setAcceptedExam] = useState<boolean | null>(null);
  const [rejectionReason, setRejectionReason] = useState<RejectionReason | undefined>();

  const [examMetadata, setExamMetadata] = useState<ExamMetadata | null>(null);

  const [fidP, setFidP] = React.useState(1500);
  const [fidQRS, setFidQRS] = React.useState(1700);
  const [fidR, setFidR] = React.useState(1870);
  const [fidR2, setFidR2] = React.useState(2760);
  const [fidS, setFidS] = React.useState(1900);
  const [fidST, setFidST] = React.useState(2000);
  const [fidT, setFidT] = React.useState(2100);
  const fiducialStates: FiducialStates = {
    fidP: fidP, setFidP: setFidP,
    fidQRS: fidQRS, setFidQRS: setFidQRS,
    fidR: fidR, setFidR: setFidR,
    fidR2: fidR2, setFidR2: setFidR2,
    fidS: fidS, setFidS: setFidS,
    fidST: fidST, setFidST: setFidST,
    fidT: fidT, setFidT: setFidT
  };

  const [diagnosticosSugeridos, setDiagnosticosSugeridos] = useState<(DiagnosticPrediction)[]>([]);
  const [doctorDiagnostics, setDoctorDiagnostics] = useState<(Diagnostic)[]>([]);
  const diagnosticStates: DiagnosticStates = {
    diagnosticosSugeridos: diagnosticosSugeridos,
    setDiagnosticosSugeridos: setDiagnosticosSugeridos,
    doctorDiagnostics: doctorDiagnostics,
    setDoctorDiagnostics: setDoctorDiagnostics
  };

  const [validated, setValidated] = useState<boolean>();
  const [isLocked, setIsLocked] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [reloadTime, setReloadTime] = useState<number>();

  useEffect(
    () => {
      markExamIdAsLocked(examIdNumber).then(
        (response) => {
          setIsLocked(false);
        },
        (error) => {
          if(error.response.status === 423){
            setIsLocked(true);
            const timeRemaining = error.response.data.timeRemaining;
            const expTime = new Date(timeRemaining);
            const asTimestamp = new Date(error.response.data.asTimestamp);
            const msg = `Este examen está siendo visualizado por ${error.response.data.lockedBy}, el bloqueo expirará a las ${expTime.toLocaleTimeString()} a menos que 
            ${error.response.data.lockedBy} lo prolongue o lo deje de visualizar.`
            setErrorMessage(msg);
            setReloadTime(asTimestamp.getTime());
          }
        }
      )
      return () => {
        markExamIdAsUnlocked(examIdNumber).then(
          (response) => {
          },
          (error) => {
          }
        );
      }
  }, []);
  
  useEffect(() => {
    if(isLocked){
      const timeoutId = setTimeout(()=>{
        navigate(0);
      }, reloadTime);
      return () => clearTimeout(timeoutId);
    } else{
      const intervalId = setInterval(()=>{
        markExamIdAsLocked(examIdNumber);
      }, 55000);

      return () => clearInterval(intervalId);
    }

  }, [isLocked]);

  useEffect(() => {
    getExamDataSistemed2(examIdNumber).then((response) => {
      if (response?.data?.Error === false) {
        setExamMetadata({
          patientId: response.data.PatientId,
          birthday: response.data.Birthday,
          gender: response.data.Gender,
          backgrounds: Object.entries(response.data.Backgrounds).map(([key, value]: [string, any]) => {
            return { id: value.ID, name: value.NAME };
          }),
          medications: Object.entries(response.data.Medications).map(([key, value]: [string, any]) => {
            return { id: value.ID, name: value.NAME, dose: value.DOSE };
          }),
          symptoms: Object.entries(response.data.Symptoms).map(([key, value]: [string, any]) => {
            return { id: value.ID, name: value.NAME, dose: value.DOSE };
          })
        });
      }
    });
  }, []);
  
  useEffect(() => {
    setIsLoadingExamData(true);
    getExam(examIdNumber).then(
      (response) => {
        setExamData({
          examId: response.data.examId,
          patientId: response.data.patientId,
          createdAt: response.data.createdAt,
          status: response.data.estado,
          accepted: response.data.accepted,
          urgency: response.data.urgencia,
          results: response.data.resultados,
          operatorReview: response.data.operatorReview,
          operatorAccept: response.data.operatorAccept,
          rejectionId: response.data.rejectionId,
          rejectedDerivation: response.data.rejectedDerivation,
        });
        setValidated(response.data?.operatorReview);
        let newRejectionReason = rejectionReasons.find(object => object.id == response.data.rejectionId);
        setRejectionReason(newRejectionReason);
        setIsLoadingExamData(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setExamData(_content);
      }
    );
  }, [acceptedExam]);

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

          const isAccepted: boolean = examData?.operatorAccept != undefined ?
            (examData?.operatorAccept === true ? true : false) :
            (examData?.accepted === true ? true : false);
          if (isAccepted) {

            const isUrgent: boolean = examData?.urgency != undefined ?
              ((examData?.urgency > 1) ? true : false) :
              false;
            acceptExamSistemed2(examIdNumber, isUrgent);

            postMarkersSistemed2(examIdNumber, fidP, fidQRS, fidR, fidS, fidST, fidT, fidR2);

            const suggestedDiagnostics: DiagnosticSistemed2[] = [];
            diagnosticStates.diagnosticosSugeridos.forEach((item: DiagnosticPrediction) => {
              suggestedDiagnostics.push({ ID: item.diagnosticId, METRIC: Math.round(item.accuracy * 100) });
            });
            diagnosticStates.doctorDiagnostics.forEach((item: Diagnostic) => {
              suggestedDiagnostics.push({ ID: item.diagnosticId, METRIC: 100 });
            });
            postDiagnosticsSistemed2(examIdNumber, suggestedDiagnostics);
          }
          else {
            rejectExamSistemed2(examIdNumber, examData?.rejectionId, examData?.rejectedDerivation);
          }

          setValidated(!validated);
          handleGoBack();
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
        setIsLocked(false);
      },
      (error) => {
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
                <AnalisisBox examId={examIdNumber} 
                             analisisData={examData} 
                             isLoading={isLoadingExamData} 
                             setAccepted={setAcceptedExam}
                             rejectionReason={rejectionReason} 
                             setRejectionReason={setRejectionReason}/>
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
                <DiagnosisComponent examId={examIdNumber} diagnosticStates={diagnosticStates} />
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
            <DerivationsComponent examId={examIdNumber} fiducialStates={fiducialStates} />
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
                <AnalisisBox examId={examIdNumber} 
                             analisisData={examData}
                             isLoading={isLoadingExamData} 
                             setAccepted={setAcceptedExam} 
                             rejectionReason={rejectionReason} 
                             setRejectionReason={setRejectionReason} />
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
                <DiagnosisComponent examId={examIdNumber} diagnosticStates={diagnosticStates} />
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
            <DerivationsComponent examId={examIdNumber} fiducialStates={fiducialStates} />
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
