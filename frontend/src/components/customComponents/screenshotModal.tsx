import { Box, Button, Stack, Typography, SelectChangeEvent, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { FiducialStates } from "../views/ExamsView";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ScreenshotComponent from "./ScreenshotComponent";
import html2canvas from "html2canvas";




const ScreenshotModal: React.FC<any> = ({examId, fiducialStates, examData, examMetadata, isLoadingExamData, diagnosticStates, closeModal}): JSX.Element => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerHeight*1.8,
    minWidth: 1000,
    minHeight: 800,
    height: window.innerHeight*0.95,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
    
    const doctors = [
        "Dr. Uno",
        "Dra. Dos",
        "Dr. Tres",
    ];

    const [selectedDoctor, setSelectedDoctor] = React.useState('');
    const { t } = useTranslation();

    const [showNotImplemented, setShowNotImplemented] = React.useState(false);

    const handleSelectedDoctorChange = (event: SelectChangeEvent) => {
        setSelectedDoctor(event.target.value as string);
      };

    const handleSendScreenshot = () => {
        console.log("trying to send screenshot");
        setShowNotImplemented(true);
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
    <Stack alignItems="center" spacing={2} direction="row" height={'100%'} width={'100%'}>
    <div className="print-layout" id="capture" style={{ width: '90%', height: '100%' }}>
      <Grid container style={{ width: '100%', height: '100%' }}>
        <ScreenshotComponent examId={examId} fiducialStates={fiducialStates} analisisData={examData}
         examMetadata={examMetadata} isLoading={isLoadingExamData} diagnosticStates={diagnosticStates}/>
      </Grid>
    </div>
    <Stack alignItems="center" spacing={2} direction="column" width={'10%'}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#007088',
        color: "#fff",
        minWidth: 100,
      }}
      onClick={closeModal}>
      <Typography fontStyle={"bold"} color={"#ffffff"}>
        {t("close")}
      </Typography>
    </Button>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#007088',
        color: "#fff",
        minWidth: 100,
      }}
      onClick={handleCapture}>
      <Typography fontStyle={"bold"} color={"#ffffff"}>
        {t("download")}
      </Typography>
    </Button>
    <FormControl sx={{ m: 3, minWidth: 100, width: '16ch'}}>
      <InputLabel>{t("selectDoctor")}</InputLabel>
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
            minWidth: 100,
        }}
        disabled={!selectedDoctor}
        onClick={handleSendScreenshot}>
        <Typography fontStyle={"bold"} color={"#ffffff"}>
            {t("sendToDoctor")}
        </Typography>
        </Button>
        {showNotImplemented &&
        <Typography fontStyle={"bold"} color={"Black"}>
        {"Todavia no se implementa enviar al doctor:("}
        </Typography>}
      </Stack>
    </Stack>
    </Box>
    </div>);
};

export default ScreenshotModal;
