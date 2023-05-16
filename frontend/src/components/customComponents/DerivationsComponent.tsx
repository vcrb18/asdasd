import { Box, Button, Stack, Typography, createTheme, SelectChangeEvent, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import FiducialChart from "./FiducialChart";
import FiducialMeasurementsTable from "./FiducialMeasurements";
import { getExamOperatorMarkers, getExamPredictedMarkers, getTimeSeriesById, postOperatorMarkers, deleteOperatorMarkers, postOperatorMarkersComputations, deleteOperatorMarkersComputations} from "../../service/user.service";
import LineChart from "../customComponents/TwelveDerivations";
import { Grid } from "@mui/material";
import { number } from "yup";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";


interface DerivationsProps {
  examId: number;
}


const DerivationsComponent: React.FC<DerivationsProps> = ({examId}): JSX.Element => {
  // TODO: consumir puntos reales
  const [fidExamId, setFidExamId] = React.useState(0);
  const [fidP, setFidP] = React.useState(1500);
  const [fidQRS, setFidQRS] = React.useState(1700);
  const [fidR, setFidR] = React.useState(1870);
  const [fidR2, setFidR2] = React.useState(2760);
  const [fidS, setFidS] = React.useState(1900);
  const [fidST, setFidST] = React.useState(2000);
  const [fidT, setFidT] = React.useState(2100);
  
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

  const [selectedTimeSeries, setSelectedTimeSeries] = React.useState([]);

  const derivationOptions = ['I','II','III','V1','V2','V3','V4','V5','V6','VF','VL','VR'];

  const allTimeSeriesObject = 
  {
    'I':timeSeriesI,
    'II':timeSeriesII,
    'III':timeSeriesIII,
    'V1':timeSeriesV1,
    'V2':timeSeriesV2,
    'V3':timeSeriesV3,
    'V4':timeSeriesV4,
    'V5':timeSeriesV5,
    'V6':timeSeriesV6,
    'VF':timeSeriesaVF,
    'VL':timeSeriesaVL,
    'VR':timeSeriesaVR
  } as any;




  const [selectedDerivation, setSelectedDerivation] = React.useState('');
  
  const handleSelectedDerivationChange = (event: SelectChangeEvent) => {
    setSelectedDerivation(event.target.value as string);
    setSelectedTimeSeries(allTimeSeriesObject[event.target.value])
  };

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

        setSelectedTimeSeries(response.data.II)
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
          setFidExamId(response.data.examId)
          setFidP(response.data.p_start + offset)
          setFidQRS(response.data.qrs_start + offset)
          setFidR(response.data.r + offset)
          setFidR2(response.data.r2 + offset)
          setFidS(response.data.qrs_end + offset)
          setFidST(response.data.t_start + offset)
          setFidT(response.data.t_end + offset) 
        }
        else{
          getExamPredictedMarkers(examId).then(
            (response) => {
              setFidExamId(response.data.examId)
              setFidP(response.data.p_start + offset)
              setFidQRS(response.data.qrs_start + offset)
              setFidR(response.data.r + offset)
              setFidR2(response.data.r2 + offset)
              setFidS(response.data.qrs_end + offset)
              setFidST(response.data.t_start + offset)
              setFidT(response.data.t_end + offset) 
            }
          );
        }
    });
  }, [count]);

  const handleFiducialChartUpdate : Function = (childData : any) => {
    const obj2 = { ...childData };
    setFidP(childData.p_start);
    setFidQRS(childData.qrs_start);
    setFidR(childData.r);
    setFidR2(childData.r2);
    setFidS(childData.qrs_end);
    setFidST(childData.t_start);
    setFidT(childData.t_end);
  };



  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#006a6b",
      },
    },
  });
  // : React.FC<Predicciones> = ({predicciones}): JSX.Element => {
  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="left"
      width={"100%"}
      spacing={1}
    >
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
      <Box
        sx={{ backgroundColor: "#FFFFFF", border: 2, borderColor: "#DDDDDD" }}
      >
        <FiducialChart
          examId={examId}  //lo cambio, pero no la tengo clara
          fidP={fidP}
          fidQRS={fidQRS}
          fidR={fidR}
          fidR2={fidR2}
          fidS={fidS}
          fidST={fidST}
          fidT={fidT}
          handleFiducialChartUpdate = {handleFiducialChartUpdate}
          timeSeries = {selectedTimeSeries}
        />
      </Box>

      <Box>
        <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="selectDerivationInputLabel">Selecciona una derivación</InputLabel>
          <Select
            labelId="selectDerivationLabel"
            id="selectDerivationLabel"
            value={selectedDerivation}
            autoWidth
            label="GraficoDerivacionesSeleccionado"
            onChange={handleSelectedDerivationChange}
          >
          {derivationOptions.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
          </Select>
          </FormControl>
          <ThemeProvider theme={buttonsTheme}>
          <Button
           sx={{
            backgroundColor: '#007088',
            color: "#fff",
          }}
            variant="contained"
            onClick={() => {
              deleteOperatorMarkers(examId);
              deleteOperatorMarkersComputations(examId);
              setCount(count+1);
            }}
            >
            {t("restore")}
          </Button>
          <Button
          sx={{
            backgroundColor: '#007088',
            color: "#fff",
          }}
            variant="contained"
            onClick={() => {
              const newData = 
              {
                exam_id:examId - offset,
                p_start:fidP - offset,
                qrs_start:fidQRS - offset,
                r:fidR - offset,
                r2:fidR2 - offset,
                qrs_end:fidS - offset,
                t_start:fidST - offset,
                t_end:fidT - offset,
              }
              postOperatorMarkers(examId, newData);
              postOperatorMarkersComputations(examId, newData)
              callUseEffect +=1;
            }}
            >
            {t("saveChanges")}
          </Button>
        </ThemeProvider>
        </Stack>
      </Box>
      <Box>
        <Typography
          align="left"
          fontSize={"80%"}
          fontWeight={"bold"}
          width={"100%"}
          sx={{ mt: 1}}
        >
          {t("derivations")}
        </Typography>


      <Grid container 
        display={'flex'}
        alignItems={'center'} marginTop={'1%'} lg={12}>

          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesI} der_title={"I"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesII} der_title={"II"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesIII} der_title={"III"} max_points={2500}/>
            </Grid>
          </Grid>
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesaVF} der_title={"aVF"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesaVL} der_title={"aVL"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesaVR} der_title={"aVR"} max_points={2500}/>
            </Grid>
          </Grid> 
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV1} der_title={"V1"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV2} der_title={"V2"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV3} der_title={"V3"} max_points={2500}/>
            </Grid>
          </Grid> 
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV4} der_title={"V4"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV5} der_title={"V5"} max_points={2500}/>
            </Grid>
            <Grid item padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>
              <LineChart height={"25%"} width={"25%"} data={timeSeriesV6} der_title={"V6"} max_points={2500}/>
            </Grid>
          </Grid> 
          <Grid item xs={12} md={12} lg={12} padding={'1%'} sx={{bgcolor: 'white'}} alignItems={'center'} justifyContent={'space-evenly'}>

            <LineChart height={"25%"} width={"100%"} data={timeSeriesII} der_title={"II"} max_points={10000}/>
          </Grid> 

      </Grid>
      
      </Box>
      
    </Stack>
  );
};

export default DerivationsComponent;
