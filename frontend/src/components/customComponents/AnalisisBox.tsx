import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem, Box, Grid, Avatar, Button, createTheme, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData } from "../views/ExamsView";
import { getExam, getSuggestedDiagnostic, markExamIdAsAccepted, markExamIdAsRejected } from "../../service/user.service";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"

interface AnalisisProps {
  examId: number;
}

interface State {
  confidence?: number;
  status?: boolean;
  id?: string;
  rejectionReason?: string;
  rejectionReasonConfidence?: number;
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
    examId: 0,
    patientId: null,
    createdAt: "",
    status: false,
    urgency: 1,
    results: "",
    operatorReview: false,
    accepted: true,
    operatorAccept: null
  });
  const [state, setState] = useState<State>({
      confidence: 0,
      status: false,
      id: "",
      rejectionReason: "",
      rejectionReasonConfidence: 0,
    });
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getExam(examId).then(      
      (response) => {
        const data = {
          examId: response.data.exam_id,
          patientId: response.data.patient_id,
          createdAt: response.data.created_at,
          status: response.data.aceptado,
          accepted: response.data.aceptado,
          urgency: response.data.urgencia,
          results: response.data.resultados,
          operatorReview: response.data.operator_review,
          operatorAccept: response.data.operator_accept,
          resultados: "/examsview",
        };
        setAnalisisData(data);
        setIsLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setAnalisisData(_content);
      }
    );
  }, [accepted]);
  useEffect(() => {
    getSuggestedDiagnostic(examId).then(
      (response) => {
        const data = {
          confidence: response.data[0][0].confidence,
          status: response.data[0][0].estado,
          id: response.data[0][0].id,
          rejectionReason: response.data[0][0].razon_rechazo,
          rejectionReasonConfidence: response.data[0][0].razon_rechazo_confianza,
        };
        setState(data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setState(_content);
      }
    );
  }, []);
    const getReviewState = (state: boolean) : JSX.Element => {
    if (state === true) {
      return(
          <Avatar src={Check} alt={"checkVerde"} variant={"square"} sx={{maxWidth: "65%", maxHeight: "65%"}}/>      )
    } else {
      return (
          <Avatar src={X} alt={"checkRojo"} variant={"square"} sx={{maxWidth: "65%", maxHeight: "65%"}}/>
        )
    }
  }

  const toggleStateOfExam = (): void => {
    if (analisisData.operatorAccept != null){
      analisisData.operatorAccept === true ? markExamIdAsRejected(examId).then((res) => {
        if (res.data.success) {
          setAccepted(false);
        }
    }) : markExamIdAsAccepted(examId).then((res) => {
      if (res.data.success) {
        setAccepted(true);
      }
  });
    } else {
      analisisData.status === true ? markExamIdAsRejected(examId).then((res) => {
        if (res.data.success) {
          setAccepted(false);
        }
    }) : markExamIdAsAccepted(examId).then((res) => {
      if (res.data.success) {
        setAccepted(true);
      }
    });
    }
  };


  const date = analisisData?.createdAt.includes("T")
    ? analisisData?.createdAt.replace("T", " ").split(".")[0]
    : analisisData?.createdAt.split(".");

    const buttonsTheme = createTheme({
      palette: {
        primary: {
          main: "#007088",
        },
      },
    });

  return (
    <Grid container>
    {/* Sector de los datos del exámen */}
    <Grid container
    display={"flex"}
    flexDirection={"row"}
    justifyContent={"center"}>
      <Grid item>
        <Typography fontSize={"130%"} fontWeight={"bold"}>
          {t("exam")}
        </Typography>
      </Grid>
      {/* contenedor del folio */}
      <Grid container>
        <Grid item  
            xs={5} sm={5} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
            {t("folio")}
            </Typography>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Typography fontSize={"65%"} fontWeight={"bold"}>
            {analisisData?.examId}
          </Typography>
        </Grid>
      </Grid>
      {/* contenedor de la fecha */}
      <Grid container>
      <Grid item  
            xs={5} sm={5} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
            {t("date")}
            </Typography>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Typography fontSize={"65%"} fontWeight={"bold"}>
            {date}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    {/* Sector del análisis */}
    <Grid container
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      xs={12} sm={12} md={12} lg={12} 
    >
      <Grid item>
        {/* Titulo de análisis */}
        <Typography fontSize={"130%"} fontWeight={"bold"}>
        {t("analysis")}
        </Typography>
      </Grid>
        {/* Estado */}
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
        >
          <Grid item  
            xs={4} sm={4} md={4} lg={4} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
              {t("state")}
            </Typography>
          </Grid>
          {!isLoading &&
          (<>
          <Grid item display={"flex"} justifyContent={"flex-start"} width={"100%"} xs={6} sm={6} md={6} lg={6}>
            <Typography
              fontSize={"65%"}
              align="left"
              fontWeight={"bold"}
              color={stateColorSwitcher(analisisData.operatorAccept != null ? analisisData.operatorAccept : analisisData.status)}
            >
              {analisisData.operatorAccept != null ? 
              (analisisData.operatorAccept === true ? t("accepted") : t("refused")) : 
              (analisisData.status === true ? t("accepted") : t("refused"))}
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"} xs={2} sm={2} md={2} lg={2}>
            <ThemeProvider theme={buttonsTheme}>
              <Button
                fullWidth
                variant="contained"
                onClick={toggleStateOfExam}
                >
                <Typography fontWeight={"bold"} fontSize={"80%"} color={"#ffffff"}>
                  {t("change")}
                </Typography>
              </Button>
            </ThemeProvider>
            </Grid>
          </>
          )}
          
        </Grid>
        
        
        {state.rejectionReason && (
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid  xs={4} sm={4} md={4} lg={4} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
              {t("reason")}
            </Typography>
          </Grid>
          <Grid item  xs={8} sm={8} md={8} lg={8} display={"flex"} justifyContent={"flex-start"}>
            <Typography
              fontSize={"65%"}
              fontWeight={"bold"}
              align="left"
            >
              {state.rejectionReason}
            </Typography>
          </Grid>
        </Grid>)}
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Grid item  xs={4} sm={4} md={4} lg={4} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
            {t("urgency")}
            </Typography>
          </Grid>
          {!isLoading &&
          (<Grid item display={"flex"} justifyContent={"center"} xs={8} sm={8} md={8} lg={8}>
            <Typography
              fontSize={"70%"}
              fontWeight={"bold"}
              align="left"
              color={urgencyColorSwitcher(analisisData?.urgency)}
            >
              {analisisData?.urgency?.toString()}
            </Typography>
          </Grid>)}
        </Grid>
    </Grid>
    </Grid>
    
  );
};

export default AnalisisBox;
