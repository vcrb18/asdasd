import { Box, Stack, Typography, Container, ListItemText, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";
import { ExamMetadata, FiducialStates, DiagnosticPrediction, Diagnostic, Medication, Background, Symptom } from "../views/ExamsView";
import FiducialMeasurementsTable from "./FiducialMeasurements";
import { getExamOperatorMarkers, getExamPredictedMarkers, getTimeSeriesById, postOperatorMarkers, deleteOperatorMarkers, postOperatorMarkersComputations, deleteOperatorMarkersComputations} from "../../service/user.service";
import LineChart from "../customComponents/TwelveDerivations";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll"
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FaceIcon from '@mui/icons-material/Face';
import { patientsMetadata } from "../../utils/patientMetadataDummy";

const ScreenshotComponent: React.FC<any> = ({examId, fiducialStates, analisisData, examMetadata, isLoading, diagnosticStates}): JSX.Element => {
  const {
    fidP, setFidP,
    fidQRS, setFidQRS,
    fidR, setFidR,
    fidR2, setFidR2,
    fidS, setFidS,
    fidST, setFidST,
    fidT, setFidT } = fiducialStates;
  
  const [timeSeriesI, setTimeSeriesI] = React.useState([]);
  const [timeSeriesII, setTimeSeriesII] = React.useState([]);
  const [timeSeriesIII, setTimeSeriesIII] = React.useState([]);
  const [timeSeriesV1, setTimeSeriesV1] = React.useState([]);
  const [timeSeriesV2, setTimeSeriesV2] = React.useState([]);
  const [timeSeriesV3, setTimeSeriesV3] = React.useState([]);
  const [timeSeriesV4, setTimeSeriesV4] = React.useState([]);
  const [timeSeriesV5, setTimeSeriesV5] = React.useState([]);
  const [timeSeriesV6, setTimeSeriesV6] = React.useState([]);
  const [timeSeriesaVF, setTimeSeriesaVF] = React.useState([]);
  const [timeSeriesaVL, setTimeSeriesaVL] = React.useState([]);
  const [timeSeriesaVR, setTimeSeriesaVR] = React.useState([]);

  


  
  const dummyMetadata = patientsMetadata[2]
  const patientBackground = examMetadata?.backgrounds ? examMetadata?.backgrounds : dummyMetadata.backgrounds;
  const patientSymptoms = examMetadata?.symptoms ? examMetadata?.symptoms : dummyMetadata.symptoms;
  const patientMedications = examMetadata?.medications ? examMetadata?.medications : dummyMetadata.medications;
  console.log(dummyMetadata)
  console.log("patientBackground:", patientBackground);
  console.log("patientSymptoms", patientSymptoms);
  console.log("patientMedications", patientMedications);
  console.log(patientMedications.length);

  function getPatientSymptomAsText(symptom: Symptom | undefined): string {
    if(!symptom) return("");
    if(symptom?.days === 0 && symptom?.hours > 0)
    return(`${symptom?.name} hace ${symptom?.hours} horas`);
    if(symptom?.days > 0 && symptom?.hours === 0)
    return(`${symptom?.name} hace ${symptom?.days} dias`);
    if(symptom?.days > 0 && symptom?.hours > 0)
    return(`${symptom?.name} hace ${symptom?.days} dias y ${symptom?.hours} horas`);
    return(`${symptom?.name}`);
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

  useEffect(()=> {
    getTimeSeriesById(examId).then(
      response =>{

        setTimeSeriesI(response.data.I)
        setTimeSeriesII(response.data.II)
        setTimeSeriesIII(response.data.III)
        setTimeSeriesV1(response.data.V1)
        setTimeSeriesV2(response.data.V2)
        setTimeSeriesV3(response.data.V3)
        setTimeSeriesV4(response.data.V4)
        setTimeSeriesV5(response.data.V5)
        setTimeSeriesV6(response.data.V6)
        setTimeSeriesaVF(response.data.aVF)
        setTimeSeriesaVL(response.data.aVL)
        setTimeSeriesaVR(response.data.aVR)
    }); 
  },[]);


  
  let callUseEffect = 0;
  const { t } = useTranslation();
  const [count, setCount] = React.useState(0); 

  const offset = 640;

  useEffect(()=> {
    getExamOperatorMarkers(examId).then(
      (response) => {
        if (response.status ==  200){
          setFidP(response.data.pStart + offset)
          setFidQRS(response.data.qrsStart + offset)
          setFidR(response.data.r + offset)
          setFidR2(response.data.r2 + offset)
          setFidS(response.data.qrsEnd + offset)
          setFidST(response.data.tStart + offset)
          setFidT(response.data.tEnd + offset) 
        }
        else{
          getExamPredictedMarkers(examId).then(
            (response) => {
              setFidP(response.data.pStart + offset)
              setFidQRS(response.data.qrsStart + offset)
              setFidR(response.data.r + offset)
              setFidR2(response.data.r2 + offset)
              setFidS(response.data.qrsEnd + offset)
              setFidST(response.data.tStart + offset)
              setFidT(response.data.tEnd + offset) 
            }
          );
        }
    });
  }, [count]);

  const {
    diagnosticosSugeridos,
    setDiagnosticosSugeridos,
    doctorDiagnostics,
    setDoctorDiagnostics } = diagnosticStates;

  const handleOpenDerivation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) : void => {
  }

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
 
  const getMetadataToDisplay = (examMetadata: ExamMetadata | null): string => {
    if (!examMetadata) return '';

    const gender = remapGender(examMetadata?.gender);
    const age = getAge(examMetadata?.birthday);
    return `${t(gender)}, ${age} ${t("yearsOld")}`;
  }

  const date = analisisData?.createdAt == undefined
  ? '' 
  : (new Date(analisisData.createdAt)).toLocaleString('es-CL', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

  const displayAccepted : boolean = analisisData?.operatorAccept != undefined ? 
    (analisisData?.operatorAccept === true ? true : false) : 
      (analisisData?.accepted === true ? true : false);

  const styleToGraphics = {
    margin: "4px",
    border: "2px solid black",
    maxWidth: '500px',
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      borderRadius: "5px",
      boxShadow: "0 0 15px green",
      background: "#fff",
    },
  }

  return (
    <Box width={"100%"} height={"100%"} >
    <Stack
      display={"flex"}
      flexDirection={"row"}
      alignItems="center"
      width={"100%"}
      height={"100%"}
      spacing={1}
    >
        <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
      width={"45%"}
      height={"100%"}
      justifyContent="space-evenly"
      spacing={2}
    >
    <Stack
      display={"flex"}
      flexDirection={"row"}
      alignItems="center"
      width={"100%"}
      height={"100%"}
      spacing={1}
    >
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
      width={"100%"}
      height={"100%"}
      spacing={1}
    >
    <Container
        sx={{
          height: '40%',
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
            <Typography fontSize={"100%"} fontWeight={"bold"}>
            {t("folio")}
            </Typography>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Typography fontSize={"100%"} fontWeight={"bold"}>
            {analisisData?.examId}
          </Typography>
        </Grid>
      </Grid>
      {/* contenedor de la fecha */}
      <Grid container>
      <Grid item  
            xs={5} sm={5} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} paddingLeft={"5%"}>
            <Typography fontSize={"100%"} fontWeight={"bold"}>
            {t("date")}
            </Typography>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Typography fontSize={"100%"} fontWeight={"bold"}>
            {date}
          </Typography>
        </Grid>
      </Grid>
        <Grid container>
          <Grid item
            xs={5} sm={5} md={5} lg={5} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} paddingLeft={"5%"}>
            <Typography fontSize={"100%"} fontWeight={"bold"}>
              {t("patient")}
            </Typography>
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7}>
            <Typography fontSize={"100%"} fontWeight={"bold"}>
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
            <Typography fontSize={"100%"} fontWeight={"bold"}>
              {t("state")}
            </Typography>
          </Grid>
          {!isLoading &&
          (<>
          <Grid item display={"flex"} justifyContent={"flex-start"} width={"100%"} xs={3} sm={3} md={3} lg={3}>
            <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
              color={stateColorSwitcher(analisisData?.operatorAccept != undefined ? analisisData?.operatorAccept : analisisData?.accepted)}
            >
              { displayAccepted ? t("accepted") : t("rejected") }
            </Typography>
          </Grid>
          <Grid item display={"flex"} justifyContent={"flex-start"} width={"100%"} xs={2} sm={2} md={2} lg={2}>
            <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {analisisData?.operatorAccept == undefined && analisisData?.accuracy !=  undefined && ((analisisData?.accuracy*100).toFixed(1) + "%")}
            </Typography>
          </Grid>
        
          </>
          )}
          
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Grid item  xs={4} sm={4} md={4} lg={4} display={"flex"} justifyContent={"flex-start"} paddingLeft={"5%"}>
            <Typography fontSize={"100%"} fontWeight={"bold"}>
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
    </Container>
    <Container 
              sx={{
                height: '60%',
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
    <Box width={"100%"} height={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
    <Stack direction="column">
        <Typography fontWeight={"bold"} fontSize={"130%"}>
          {t("suggestedDiagnoses")}
        </Typography>
      <List        sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        '& ul': { padding: 0 },
      }}>
      {diagnosticosSugeridos.length>0 && diagnosticosSugeridos.map((item: DiagnosticPrediction) => (
        <ListItem sx={{border: 1,
          borderColor: "#E4EDEF",
          borderRadius: "1%",
        }}>
        <SmartToyIcon/>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
            </Typography>
        </ListItemText>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="right"
              fontWeight={"bold"}
            >
              {(item.accuracy*100).toFixed(1) + "%"}
            </Typography>
        </ListItemText>
        </ListItem>
       ))}
      {doctorDiagnostics.length>0 && doctorDiagnostics.map((item: Diagnostic) => (
        <ListItem sx={{border: 1,
          borderColor: "#E4EDEF",
          borderRadius: "1%",
        }}>
        <FaceIcon/>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
        </Typography>
        </ListItemText>
        </ListItem>
       ))}
      </List>
      {doctorDiagnostics.length === 0 && diagnosticosSugeridos.length === 0 && 
        <Typography
                fontSize={"100%"}
                align="center"
                fontWeight={"bold"}
              >
                {t("No hay diagnosticos sugeridos")}
        </Typography>}
      </Stack>
      </Box>
      </Container>
      </Stack>
      <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
      width={"100%"}
      height={"100%"}
      spacing={1}
    >
      {/* Background */}
      <Container 
              sx={{
                height: '33%',
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
    <Box width={"100%"} height={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
      <Stack direction="column" width={"100%"}>
        <Typography fontWeight={"bold"} fontSize={"130%"} align="center">
          {t("Background")}
        </Typography>
        <List        sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '& ul': { padding: 0 },
      }}>
        {patientBackground.length>0 && patientBackground.map((item: Background) => (
        <ListItem sx={{border: 1,
          borderColor: "#E4EDEF",
          borderRadius: "1%",
        }}>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {item.name ? t(item.name) : ""}
            </Typography>
        </ListItemText>
        </ListItem>
       ))}
      </List>
        </Stack>
      </Box>
      <Box width={"100%"}>        
      </Box>
      </Container>
      {/* SYMPTOMS */}
      <Container 
              sx={{
                height: '33%',
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
    <Box width={"100%"} height={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
      <Stack direction="column" width={"100%"}>
        <Typography fontWeight={"bold"} fontSize={"130%"} align="center">
          {t("Sintomas")}
        </Typography>
        <List        sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '& ul': { padding: 0 },
      }}>
        {patientSymptoms.length>0 && patientSymptoms.map((item: Symptom) => (
        <ListItem sx={{border: 1,
          borderColor: "#E4EDEF",
          borderRadius: "1%",
        }}>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {item.name ? getPatientSymptomAsText(item) : ""}
            </Typography>
        </ListItemText>
        </ListItem>
       ))}
      </List>
        </Stack>
      </Box>
      <Box width={"100%"}>        
      </Box>
      </Container>
      {/* MEDICACIONES */}
      <Container
              sx={{
                height: '33%',
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
    <Box width={"100%"} height={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
      <Stack direction="column" width={"100%"}>
        <Typography fontWeight={"bold"} fontSize={"130%"} align="center" width={"100%"} height={"20%"}>
          {t("Medicaciones")}
        </Typography >
        <List       
        sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '& ul': { padding: 0 },
      }}>
        {patientMedications.length>0 && patientMedications.map((item: Medication) => (
        <ListItem sx={{border: 1,
          borderColor: "#E4EDEF",
          borderRadius: "1%",
          width:"100%",
        }}>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="left"
              fontWeight={"bold"}
            >
              {item.name ? t(item.name) : ""}
            </Typography>
        </ListItemText>
        <ListItemText>
        <Typography
              fontSize={"100%"}
              align="right"
              fontWeight={"bold"}
            >
              {item.dose ? "Dosis:" + item.dose.toString() : ""}
            </Typography>
        </ListItemText>
        </ListItem>
       ))}
      </List>
        </Stack>
      </Box>
      <Box width={"100%"}>        
      </Box>
      </Container>
      </Stack>
      </Stack>
      </Stack>

      <Container 

        sx={{ width: '55%' }}>
          <Stack direction="column">
          <Stack direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}>
          <Stack direction="column">
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
                <LineChart id={"I"}  height={"200%"} width={"175%"}  ratio={4/3} data={timeSeriesI} max_points={2500} />
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"II"}  height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesII} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"III"} height={"200%"} width={"175%"}  ratio={4/3} data={timeSeriesIII} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column">
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVF"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesaVF} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVL"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesaVL} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVR"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesaVR} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column">
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V1"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV1} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V2"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV2} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V3"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV3} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column">
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V4"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV4} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V5"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV5} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V6"} height={"200%"} width={"175%"} ratio={4/3} data={timeSeriesV6} max_points={2500}/>
              </Box>
          </Stack>
          </Stack>
          <Grid item xs={12} md={12} lg={12} padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
            <Box onClick={handleOpenDerivation}>
            <LineChart id={"II"} height={"25%"} width={"100%"} ratio={16/3} data={timeSeriesII} max_points={10000}/>
            </Box>
          </Grid>
          <Element name="graphic" >
          <Box sx={{ border: 2, borderColor: "#DDDDDD" }}>
            <FiducialMeasurementsTable
              fidP={fidP}
              fidQRS={fidQRS}
              fidR={fidR}
              fidR2={fidR2}
              fidS={fidS}
              fidST={fidST}
              fidT={fidT}
              examId={examId}
            />
          </Box>
          </Element>
          </Stack> 
      </Container>  
    </Stack>
    </Box>
  );
};

export default ScreenshotComponent;
