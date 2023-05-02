import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData } from "../views/ExamsView";
import { getExam, getSuggestedDiagnostic, markExamIdAsAccepted, markExamIdAsRejected } from "../../service/user.service";

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
  useEffect(() => {
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
        {t("analysis")}
        </Typography>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
            {t("state")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={"80%"}
              color={stateColorSwitcher(analisisData.operatorAccept != null ? analisisData.operatorAccept : analisisData.status)}
            >
              {analisisData.operatorAccept != null ? 
              (analisisData.operatorAccept === true ? t("accepted") : t("refused")) : 
              (analisisData.status === true ? t("accepted") : t("refused"))}
            </Typography>
          </Grid>
          <Grid item>
          <Button
          variant="contained"
          sx={{ backgroundColor: "#006a6b", color: "#ffffff" }}
          onClick={toggleStateOfExam}
        >
          {t("change")}
        </Button>
          </Grid>
        </Grid>
        
        
        {state.rejectionReason && (
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
              {t("reason")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={"80%"}
            >
              {state.rejectionReason}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>)}
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          padding={"1%"}
        >
          <Grid item>
            <Typography fontSize={"80%"} sx={{ color: "#000000" }}>
            {t("urgency")}
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-end"}>
            <Typography
              fontSize={"80%"}
              color={urgencyColorSwitcher(analisisData?.urgency)}
            >
              {analisisData?.urgency?.toString()}
            </Typography>
          </Grid>
          <Grid item></Grid>
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
