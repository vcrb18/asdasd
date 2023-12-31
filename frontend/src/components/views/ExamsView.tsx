import { Box, Button, Fab, Grid, Modal, Paper, Stack, TextField, ThemeProvider, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import PredictionBox from "../customComponents/PredictionBox";
import AnalisisBox from "../customComponents/AnalisisBox";
import DerivationsComponent from "../customComponents/DerivationsComponent";
import Header, { TabProps } from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import {
  getExam,
  markExamIdAsLocked,
  markExamIdAsUnlocked,
  putExamReview, putExamUnreview,
  getExamDataSistemed2,
  acceptExamSistemed2, rejectExamSistemed2,
  postMarkersSistemed2,
  DiagnosticSistemed2, postDiagnosticsSistemed2, getRejectedPrediction
} from "../../service/user.service";
import { type ExamMetadata } from "../../utils/MetadataTransforms";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import DiagnosisComponent from "../customComponents/DiagnosisComponent";

import ScreenshotModal from "../customComponents/screenshotModal";
import { Patient } from "../../utils/ExamTableConst";

interface ExamsViewProps {
  // examId: number ;
  buttons: Array<{ label: string; href: string }>;
  tabs?: TabProps[];
}

export interface ExamData {
  accepted: boolean;
  accuracy: number;
  createdAt: string;
  examId: number;
  operatorAccept: boolean | null;
  operatorReview: boolean;
  organizationLegalName: string;
  patient: Patient;
  rejectedDerivation: string | null;
  rejectionId: number | null;
  urgency: number;
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
    medFC: number;
    setMedFC: Dispatch<number>;
    medRR: number;
    setMedRR: Dispatch<number>;
    medPQ: number;
    setMedPQ: Dispatch<number>;
    medQRS: number;
    setMedQRS: Dispatch<number>;
    medQT: number;
    setMedQT: Dispatch<number>;
    medQTC: number;
    setMedQTC: Dispatch<number>;
    medST: number;
    setMedST: Dispatch<number>;
}

export interface Diagnostic {
    diagnosticId: number,
    diagnostic: string,
    order: number,
    threshold: number,
}

export interface DiagnosticDataBase {
  examId: number,
  diagnosticId: number,
  prediction: boolean,
  accuracy: number,
  display: boolean,
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

export interface Derivation {
  id: number,
  derivation: string,
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

export const derivations: Derivation[] = [
  {id: 1, derivation: "I"},
  {id: 2, derivation: "II"},
  {id: 3, derivation: "III"},
  {id: 4, derivation: "aVR"},
  {id: 5, derivation: "aVL"},
  {id: 6, derivation: "aVF"},
  {id: 7, derivation: "V1"},
  {id: 8, derivation: "V2"},
  {id: 9, derivation: "V3"},
  {id: 10, derivation: "V4"},
  {id: 11, derivation: "V5"},
  {id: 12, derivation: "V6"},
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
  const [derivation, setDerivation] = useState<Derivation | undefined>();

  const [examMetadata, setExamMetadata] = useState<ExamMetadata | null>(null);

  const [fidP, setFidP] = React.useState(1500);
  const [fidQRS, setFidQRS] = React.useState(1700);
  const [fidR, setFidR] = React.useState(1870);
  const [fidR2, setFidR2] = React.useState(2760);
  const [fidS, setFidS] = React.useState(1900);
  const [fidST, setFidST] = React.useState(2000);
  const [fidT, setFidT] = React.useState(2100);
  const [medFC, setMedFC] = React.useState(0);
  const [medRR, setMedRR] = React.useState(0);
  const [medPQ, setMedPQ] = React.useState(0);
  const [medQRS, setMedQRS] = React.useState(0);
  const [medQT, setMedQT] = React.useState(0);
  const [medQTC, setMedQTC] = React.useState(0);
  const [medST, setMedST] = React.useState(0);
  const fiducialStates: FiducialStates = {
    fidP: fidP, setFidP: setFidP,
    fidQRS: fidQRS, setFidQRS: setFidQRS,
    fidR: fidR, setFidR: setFidR,
    fidR2: fidR2, setFidR2: setFidR2,
    fidS: fidS, setFidS: setFidS,
    fidST: fidST, setFidST: setFidST,
    fidT: fidT, setFidT: setFidT,
    medFC: medFC, setMedFC: setMedFC,
    medRR: medRR, setMedRR: setMedRR,
    medPQ: medPQ, setMedPQ: setMedPQ,
    medQRS: medQRS, setMedQRS: setMedQRS,
    medQT: medQT, setMedQT: setMedQT,
    medQTC: medQTC, setMedQTC: setMedQTC,
    medST: medST, setMedST: setMedST,
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

  const viewRef = useRef<HTMLDivElement>(null);

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
            return { id: value.ID, name: value.NAME, days: value.DAYS, hours: value.HOURS };
          }),
          identifier: response.data.Identifier,
          name: response.data.Name,
          lastName: response.data.LastName,
        });
      }
    });
  }, []);

  useEffect(() => {
    setIsLoadingExamData(true);
    getExam(examIdNumber).then(
      (response) => {
        setExamData(response.data);
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

  const notRefusedForAlgorithms = examData?.operatorAccept != null || examData?.accepted;
  useEffect(() => {
    if(notRefusedForAlgorithms) return;
    getRejectedPrediction(examIdNumber).then(
      (response) => {
        const newRejectionReason = rejectionReasons.find(object => object.id == response.data.rejectionId);
        setRejectionReason(newRejectionReason);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setRejectionReason(_content);
      }
    );
  }, [examData]);

  const validationButtonMessage: string = (validated) ? t("undoValidation") : t("validateMeasurements");
  const toggleValidatedExam = (): void => {
    if (validated) {
      putExamUnreview(examIdNumber).then((res) => {
        if (res.data.success) {
          setValidated(!validated);
          markExamIdAsUnlocked(examIdNumber).then(
            (response) => {
              setIsLocked(false);
            },
            (error) => {
            }
          );
          navigate("/exams?undoValidation=true");
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

            postMarkersSistemed2(examIdNumber,
              fidP, fidQRS, fidR, fidS, fidST, fidT, fidR2,
              medFC, medRR, medPQ, medQRS, medQT, medQTC, medST);

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
          markExamIdAsUnlocked(examIdNumber).then(
            (response) => {
              setIsLocked(false);
            },
            (error) => {
            }
          );
          navigate("/exams?validation=true");
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

  const [open, setOpen] = React.useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [fiducialChart, setFiducialChart] = React.useState(null);
  const handleOpenModal = () => {
    setOpen(true);
  }
  const handleCloseModal = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if (isLocked && !isMatchXs){
    return(
      <>
      <div ref={viewRef}>
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
    <div ref={viewRef}>
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
                             setRejectionReason={setRejectionReason}
                             derivation={derivation}
                             setDerivation={setDerivation}
                             />
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
                <DiagnosisComponent examId={examIdNumber} diagnosticStates={diagnosticStates}/>
            </Grid>
          </Grid>

      <Grid
          container
          display={"flex"}
          width={"100%"}
          rowSpacing={1}
          alignItems={"center"}
        >
          <div ref={chartRef}>
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
          </div>
      </Grid>

      </Grid>



    </Grid>
    </div>
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
      <div >
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
        <Grid container display={"flex"}  mb={"4%"} item xs={12} sm={12} md={8} lg={8} flexDirection={"column"} ref={viewRef}>
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
                             setRejectionReason={setRejectionReason}
                             derivation={derivation}
                             setDerivation={setDerivation}
                             />
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
          <div ref={chartRef}>
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
          </div>
      </Grid>

      </Grid>



      {/* Contenedor del botón de validación y screenshot*/}
      <Grid item display={"flex"} flexDirection={"column"} xs={12} sm={12} md={2} lg={2}
                  sx={{
                    right: "2%",
                    position:"fixed",
                  }}>
        <Grid item>
          <Stack direction={"column"} spacing={2}>
        <ThemeProvider theme={buttonsTheme}>
          <Button
            variant="contained"
            sx={{
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

        
        <ThemeProvider theme={buttonsTheme}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007088',
              color: "#fff",// Set a fixed width for the button, // Use shorthand notation for marginLeft
            }}
            onClick={handleOpenModal}
            >
            <Typography fontStyle={"bold"} color={"#ffffff"}>
              {t("captureScreenshot")}
            </Typography>
          </Button>
        </ThemeProvider>
        </Stack>
        </Grid>
      </Grid>
    
    </Grid>
    <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

    >
      <ScreenshotModal examId={examId} fiducialStates={fiducialStates} examData={examData}
         examMetadata={examMetadata} isLoadingExamData={isLoadingExamData} diagnosticStates={diagnosticStates} closeModal={handleCloseModal}/>
    </Modal>
    <div style={{width: "100%", bottom: 0, position: "relative"}}>
      <Footer
        footerPositionLg="sticky"
        footerPositionMd="sticky"
        footerPositionXs="sticky" />
    </div>
    </div>
    </>
    )
  }
}
;

export default ExamsView;
