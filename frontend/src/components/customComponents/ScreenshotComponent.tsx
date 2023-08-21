import { Box, Stack, Typography, Container, ListItemText, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";
import { FiducialStates, DiagnosticPrediction, Diagnostic} from "../views/ExamsView";
import { type Background, type Medication, type Symptom, type ExamMetadata } from "../../utils/MetadataTransforms";
import FiducialMeasurementsTable from "./FiducialMeasurements";
import { getExamOperatorMarkers, getExamPredictedMarkers, getTimeSeriesById, postOperatorMarkers, deleteOperatorMarkers, postOperatorMarkersComputations, deleteOperatorMarkersComputations} from "../../service/user.service";
import LineChart from "../customComponents/TwelveDerivations";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll"
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FaceIcon from '@mui/icons-material/Face';
import { getFullNameToDisplay, getMetadataToDisplay } from "../../utils/MetadataTransforms";
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
  const patientInformation = analisisData.patient ? analisisData.patient : dummyMetadata;

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
          const stPos = Math.floor((response.data.qrsEnd + response.data.tEnd) / 2);
          setFidST(stPos + offset);
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
              const stPos = Math.floor((response.data.qrsEnd + response.data.tEnd) / 2);
              setFidST(stPos + offset);
              setFidT(response.data.tEnd + offset) 
            }
          );
        }
    });
  }, [count]);

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

  const date = analisisData?.createdAt == undefined
  ? '' 
  : (new Date(analisisData.createdAt)).toLocaleString('es-CL', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

  const displayAccepted : boolean = analisisData?.operatorAccept != undefined ? 
    (analisisData?.operatorAccept === true ? true : false) : 
      (analisisData?.accepted === true ? true : false);

  const styleToGraphics = {
    margin: "1px",
    border: "2px solid black",
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
      width={"25%"}
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
          height: '25%',
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
              {getFullNameToDisplay(patientInformation)} <br />
              {getMetadataToDisplay(patientInformation)}
            </Typography>
          </Grid>
        </Grid>
    </Grid>
    </Container>
    <Container 
              sx={{
                overflow: 'auto',
                height: '75%',
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
<Box width={"100%"}  mb={"5%"} display={"flex"} justifyContent={"center"}>
      <Stack direction="column" width={"100%"}>
        <Typography fontWeight={"bold"} fontSize={"130%"} align="center">
          {t("background")}
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
      <Box width={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
      <Stack direction="column" width={"100%"}>
        <Typography fontWeight={"bold"} fontSize={"130%"} align="center">
          {t("symptoms")}
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
      </Container>
      </Stack>
      </Stack>
      </Stack>

      <Container 

        sx={{ width: '75%', height: '100%' }}>
          <Stack direction="column" height={"100%"}>
          <Box sx={{height:"10%", marginBottom:"15px", border: "2px solid black"}}>
            <FiducialMeasurementsTable
              fidP={fidP}
              fidQRS={fidQRS}
              fidR={fidR}
              fidR2={fidR2}
              fidS={fidS}
              fidST={fidST}
              fidT={fidT}
              examId={examId}
              timeSeries={timeSeriesII}
            />
          </Box>
          <Stack direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          height={"65%"}>
          <Stack direction="column" width={"25%"}>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
                <LineChart id={"I"}   width={"100%"}  ratio={4/3} data={timeSeriesI} max_points={2500} />
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"II"}  width={"100%"} ratio={4/3} data={timeSeriesII} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"III"} width={"100%"}  ratio={4/3} data={timeSeriesIII} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column" width={"25%"}>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVR"} width={"100%"} ratio={4/3} data={timeSeriesaVR} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVL"}  width={"100%"} ratio={4/3} data={timeSeriesaVL} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"aVF"}  width={"100%"} ratio={4/3} data={timeSeriesaVF} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column" width={"25%"}>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V1"} width={"100%"} ratio={4/3} data={timeSeriesV1} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V2"}  width={"100%"} ratio={4/3} data={timeSeriesV2} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V3"}  width={"100%"} ratio={4/3} data={timeSeriesV3} max_points={2500}/>
              </Box>
          </Stack>
          <Stack direction="column" width={"25%"}>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V4"} width={"100%"} ratio={4/3} data={timeSeriesV4} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V5"}  width={"100%"} ratio={4/3} data={timeSeriesV5} max_points={2500}/>
              </Box>
              <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
              <LineChart id={"V6"}  width={"100%"} ratio={4/3} data={timeSeriesV6} max_points={2500}/>
              </Box>
          </Stack>
          </Stack>
          <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'}  height={"25%"}>
            <Box onClick={handleOpenDerivation} sx={styleToGraphics}>
            <LineChart id={"II"}  width={"100%"} ratio={16/3} data={timeSeriesII} max_points={10000}/>
            </Box>
          </Grid>
          </Stack> 
      </Container>  
    </Stack>
    </Box>
  );
};

export default ScreenshotComponent;
