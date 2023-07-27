import { Box, Button, Stack, Typography, SelectChangeEvent, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React from "react";
import { FiducialStates } from "../views/ExamsView";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ScreenshotComponent from "./ScreenshotComponent";
import html2canvas from "html2canvas";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    minWidth:1000,
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const ScreenshotModal: React.FC<any> = ({examId, fiducialStates, examData, examMetadata, isLoadingExamData, diagnosticStates}): JSX.Element => {

    
    const doctors = [
        "Dr. Uno",
        "Dra. Dos",
        "Dr. Tres",
    ];

    const [selectedDoctor, setSelectedDoctor] = React.useState('');
    const { t } = useTranslation();

    const handleSelectedDoctorChange = (event: SelectChangeEvent) => {
        setSelectedDoctor(event.target.value as string);
      };

    const handleSendScreenshot = () => {
        console.log("trying to send screenshot");
    };

    const handleCapture = () => {
        const element = document.getElementById('capture');
        if (element) {
            html2canvas(element).then((canvas) => {
            const dataURL = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `exam_${examId}.png`;
            link.click();
            });
        }
    };

  return (
  
  <div>    
    <Box sx={style}>
    <Stack alignItems="center" spacing={2} direction="column" height={'100%'}>
    <div className="print-layout" id="capture" style={{ width: '100%', height: '90%' }}>
      <Grid container style={{ width: '100%', height: '100%' }}>
        <ScreenshotComponent examId={examId} fiducialStates={fiducialStates} analisisData={examData}
         examMetadata={examMetadata} isLoading={isLoadingExamData} diagnosticStates={diagnosticStates}/>
      </Grid>
    </div>
    <Stack alignItems="center" spacing={2} direction="row" sx={{ height: '10%' }}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#007088',
        color: "#fff",
      }}
      onClick={handleCapture}>
      <Typography fontStyle={"bold"} color={"#ffffff"}>
        {"save"}
      </Typography>
    </Button>
    <FormControl sx={{ m: 3, minWidth: 300, width: '16ch'}}>
          <InputLabel>Select a doctor</InputLabel>
          <Select
            value={selectedDoctor}
            onChange={handleSelectedDoctorChange}
          >
          {doctors.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <Button
        variant="contained"
        sx={{
            backgroundColor: '#007088',
            color: "#fff",
        }}
        disabled={!selectedDoctor}
        onClick={handleSendScreenshot}>
        <Typography fontStyle={"bold"} color={"#ffffff"}>
            {"Send to doctor"}
        </Typography>
        </Button>
      </Stack>
    </Stack>
    </Box>
    </div>);
};

export default ScreenshotModal;
