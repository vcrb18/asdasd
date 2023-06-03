import { Box, Button, Stack, Typography, createTheme, SelectChangeEvent, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React, { MouseEventHandler, useEffect } from "react";
import FiducialChart from "./FiducialChart";
import { FiducialStates } from "../views/ExamsView";
import FiducialMeasurementsTable from "./FiducialMeasurements";
import { getExamOperatorMarkers, getExamPredictedMarkers, getTimeSeriesById, postOperatorMarkers, deleteOperatorMarkers, postOperatorMarkersComputations, deleteOperatorMarkersComputations} from "../../service/user.service";
import LineChart from "../customComponents/TwelveDerivations";
import { Grid } from "@mui/material";
import { number } from "yup";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import { Element } from "react-scroll"
import { scroller } from "react-scroll"

interface DerivationsProps {
  examId: number;
  fiducialStates: FiducialStates;
}


const DerivationsComponent: React.FC<DerivationsProps> = ({examId, fiducialStates}): JSX.Element => {
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

  const [selectedTimeSeries, setSelectedTimeSeries] = React.useState([]);

  const derivationOptions = ['I','II','III','V1','V2','V3','V4','V5','V6','aVF','aVL','aVR'];

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
    'aVF':timeSeriesaVF,
    'aVL':timeSeriesaVL,
    'aVR':timeSeriesaVR
  } as any;




  const [selectedDerivation, setSelectedDerivation] = React.useState('II');
  

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

  const handleFiducialChartUpdate : Function = (childData : any) => {
    setFidP(childData.pStart);
    setFidQRS(childData.qrsStart);
    setFidR(childData.r);
    setFidR2(childData.r2);
    setFidS(childData.qrsEnd);
    setFidST(childData.tStart);
    setFidT(childData.tEnd);
  };

  const handleOpenDerivation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) : void => {
    const target = event.target as HTMLDivElement;
    setSelectedDerivation(target.id);
    setSelectedTimeSeries(allTimeSeriesObject[target.id]);
    const scrollType = {
      duration: 500,
      delay: 1,
      smooth: true,
      offset: -100,
   };
    scroller.scrollTo("graphic", scrollType);
  }
 
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#006a6b",
      },
    },
  });

  const styleToGraphics = {
    margin: "4px",
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
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems="left"
      width={"100%"}
      spacing={1}
    >
      <Element name="graphic">
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
      </Element>

      <Box>
        <Stack direction="row" justifyContent={"flex-end"} spacing={2} >
          <FormControl sx={{ m: 1, minWidth: 90, width: '16ch'}}>
          <InputLabel id="selectDerivationInputLabel">Derivación</InputLabel>
          <Select
            labelId="selectDerivationLabel"
            id="selectDerivationLabel"
            value={selectedDerivation}
            fullWidth ={true}
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
            pl: 3,
            pr: 3,
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
                examId:examId - offset,
                pStart:fidP - offset,
                qrsStart:fidQRS - offset,
                r:fidR - offset,
                r2:fidR2 - offset,
                qrsEnd:fidS - offset,
                tStart:fidST - offset,
                tEnd:fidT - offset,
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
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation} >
                <LineChart id={"I"}  height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesI} max_points={2500} />
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"II"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesII} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
                <LineChart id={"III"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesIII} max_points={2500}/>
              </Box>
            </Grid>
          </Grid>
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"aVF"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesaVF} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"aVL"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesaVL} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"aVR"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesaVR} max_points={2500}/>
              </Box>
            </Grid>
          </Grid> 
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"V1"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV1} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"V2"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV2} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"V3"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV3} max_points={2500}/>
              </Box>
            </Grid>
          </Grid> 
          <Grid container display={'flex'} flexDirection={'column'} lg={3} xs={3} sm={3} md={3}>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"V4"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV4} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
              <LineChart id={"V5"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV5} max_points={2500}/>
              </Box>
            </Grid>
            <Grid item padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
              <Box onClick={handleOpenDerivation}>
                <LineChart id={"V6"} height={"25%"} width={"25%"} ratio={4/3} data={timeSeriesV6} max_points={2500}/>
              </Box>
            </Grid>
          </Grid> 
          <Grid item xs={12} md={12} lg={12} padding={'1%'} alignItems={'center'} justifyContent={'space-evenly'} sx={styleToGraphics}>
            <Box onClick={handleOpenDerivation}>
            <LineChart id={"II"} height={"25%"} width={"100%"} ratio={16/3} data={timeSeriesII} max_points={10000}/>
            </Box>
          </Grid> 
      </Grid>
      
      </Box>
      
    </Stack>
  );
};

export default DerivationsComponent;
