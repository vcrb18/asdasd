import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Typography, Select, MenuItem, Box, Grid, Avatar, Button, createTheme, ThemeProvider, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import DiagnosisComponent from "./DiagnosisComponent";
import { type ExamData, type ExamMetadata } from "../views/ExamsView";
import { RejectionReason, rejectionReasons} from "../views/ExamsView";
import { getExam, getSuggestedDiagnostic, markExamIdAsAccepted, markExamIdAsRejected } from "../../service/user.service";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";

interface AnalisisProps {
    examId: number;
    analisisData: ExamData | null;
    examMetadata: ExamMetadata | null;
    isLoading: boolean;
    setAccepted: Dispatch<boolean>;
    rejectionReason: RejectionReason | undefined;
    setRejectionReason: Dispatch<SetStateAction<RejectionReason | undefined> >;
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

const AnalisisBox: React.FC<AnalisisProps> = ({ examId, analisisData, examMetadata, isLoading, setAccepted, rejectionReason, setRejectionReason }): JSX.Element => {
  const { t } = useTranslation();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [possibleNewRejectionReason, setPossibleNewRejectionReason] = useState<RejectionReason | null>();

  useEffect(() => {
    getSuggestedDiagnostic(examId).then(
      (response) => {
        const data = {
          confidence: response.data[0][0].confidence,
          status: response.data[0][0].estado,
          id: response.data[0][0].id,
          rejectionReason: response.data[0][0].razonRechazo,
          rejectionReasonConfidence: response.data[0][0].razonRechazoConfianza,
        };
        let newRejectionReason: undefined | RejectionReason = rejectionReasons.find(object => object.reason == data.rejectionReason);
        setRejectionReason(newRejectionReason);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    }, []);

  const handleAddDialogClose = (): void => {
    setOpenAddDialog(false);
    setRejectionReason(undefined);
    setPossibleNewRejectionReason(null);
  };

  const handleOptionSelect = (event: any, newValue: RejectionReason | null) => {
    setPossibleNewRejectionReason(newValue);
  };

  const handleAddDialogSubmit = (): void => {
    if(possibleNewRejectionReason){
      markExamIdAsRejected(examId, possibleNewRejectionReason.id, "I").then((res) => {
        if (res.data.success) {
          setAccepted(false);
          setRejectionReason(possibleNewRejectionReason);
          setPossibleNewRejectionReason(null);
        }
      });
    }
    setOpenAddDialog(false);
  };

  const toggleStateOfExam = (): void => {
    if (analisisData?.operatorAccept != undefined){
      analisisData.operatorAccept === true ? 
      setOpenAddDialog(true)
      : markExamIdAsAccepted(examId).then((res) => {
      if (res.data.success) {
        setAccepted(true);
        setRejectionReason(undefined);
      }
  });
    } else {
      analisisData?.accepted === true ? 
      setOpenAddDialog(true) 
      : markExamIdAsAccepted(examId).then((res) => {
      if (res.data.success) {
        setAccepted(true);
        setRejectionReason(undefined);
      }
    });
    }
  };


  const date = analisisData?.createdAt == undefined
    ? '' 
    : (new Date(analisisData.createdAt)).toLocaleString('es-CL', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

    const buttonsTheme = createTheme({
      palette: {
        primary: {
          main: "#007088",
        },
      },
    });
  
  // const displayUrgency = (nivel: number) => {
  //   switch (nivel) {
  //     case 1:
  //       return(
  //         <Brightness1RoundedIcon color={"success"} />
  //     )
  //     case 2:
  //       return (
  //         <Brightness1RoundedIcon color={"warning"} />
  //       )
  //     case 3:
  //       return(
  //         <Brightness1RoundedIcon color={"error"} />
  //       )
  //     }
  // }

  const remapGender = (gender: string | undefined): string => {
    switch (gender) {
      case "HOMBRE":
        return "male";
      case "MUJER":
        return "female";
      default:
        return "";
    }
  };

  const getAge = (birthday: string | undefined): string => {
    if (birthday === undefined) return '';

    const splittedDate = birthday.split('-');
    if (splittedDate.length != 3) return '';

    const day = parseInt(splittedDate[0]);
    const month = parseInt(splittedDate[1]);
    const year = parseInt(splittedDate[2]);

    const currentDate = new Date();
    let age = currentDate.getFullYear() - year;

    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    if ((month > currentMonth) || (month == currentMonth && day > currentDay)) {
      age = age - 1;
    }

    return age.toString();
  };

  const getMetadataToDisplay = (examMetadata: ExamMetadata | null): string => {
    if (!examMetadata) return '';

    const gender = remapGender(examMetadata?.gender);
    const age = getAge(examMetadata?.birthday);
    return `${t(gender)}, ${age} ${t("yearsOld")}`;
  }

  const getRemainingTimeColor = (colorNumber: number) :  "error" | "success" | "warning"  => {
    switch (colorNumber) {
      case 1:
        return(
          "success"
      )
      case 2:
        return (
          "warning"
        )
      case 3:
        return(
          "error"
        )
      default:
        return ("error")
      }
  }
  const getRemainingTime = (deadline: string | undefined): number => {
    if(!deadline) return 0;
    const deadlineDate = new Date(deadline);
    const hardcodedExtraTime = 1
    deadlineDate.setHours(deadlineDate.getHours() + hardcodedExtraTime);
    const currentDate = new Date();
    const remaningTime = deadlineDate.getTime() - currentDate.getTime();
    let ago = t('examTimeRemaining');
    let remaningTimeColor = 1;
    const elapsedTime = remaningTime;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    if (days < 0 || hours < 0 || minutes < 0 ||seconds < 0) {
      ago = t('examTimeAgo');
      remaningTimeColor = 3;
    } else {
      if (hours < 0 && minutes <= 15) {
        ago = t('examTimeRemaining');
        remaningTimeColor = 2;
      }
    }
    return (
       remaningTimeColor
      )
  };

  const displayUrgency= (urgency: number) : JSX.Element  => {
    return(
    <>
      <Brightness1RoundedIcon color={getRemainingTimeColor(urgency)} />
    </>
    )
    }

  const displayAccepted : boolean = analisisData?.operatorAccept != undefined ? 
    (analisisData?.operatorAccept === true ? true : false) : 
      (analisisData?.accepted === true ? true : false);

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
        <Grid container>
          <Grid item
            xs={5} sm={5} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} paddingLeft={"5%"}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
              {t("patient")}
            </Typography>
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7}>
            <Typography fontSize={"65%"} fontWeight={"bold"}>
              {getMetadataToDisplay(examMetadata)}
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
              color={stateColorSwitcher(analisisData?.operatorAccept != undefined ? analisisData?.operatorAccept : analisisData?.accepted)}
            >
              { displayAccepted ? t("accepted") : t("refused") }
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
            <Dialog fullWidth={false} maxWidth={"sm"}  open={openAddDialog} onClose={handleAddDialogClose}>
              <DialogTitle>{t("add")} {t("reason")}</DialogTitle>
              <DialogContent>
                <Autocomplete
                isOptionEqualToValue={(option, value) => option.reason === value.reason}
                getOptionLabel={(option) => option.reason}
                value={rejectionReason || null}
                onChange={handleOptionSelect}
                id="select-diagnostic"
                options={rejectionReasons}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params}/>}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAddDialogClose}>{t("cancel")}</Button>
                <Button
                onClick={handleAddDialogSubmit}
                variant="contained"
                color="error"
                >
                  {t("submit")}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          </>
          )}
          
        </Grid>
        
        
        {rejectionReason && !displayAccepted &&  (
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
              {rejectionReason.reason}
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
          (<Grid item display={"flex"} justifyContent={"center"} alignItems={"center"} xs={8} sm={8} md={8} lg={8}>
            {/* {displayUrgency(analisisData?.urgency)} */}
            {displayUrgency(getRemainingTime(analisisData?.createdAt))}
          </Grid>)}
        </Grid>
    </Grid>
    </Grid>
    
  );
};

export default AnalisisBox;
