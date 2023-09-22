import { Box, Button, Stack, Typography, SelectChangeEvent, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ScreenshotComponent from "./ScreenshotComponent";
import html2canvas from "html2canvas";
import { ImageToBlobParser, createFormData } from "../../utils/WhatsappImage";
import { sendImageToDoctor } from "../../service/user.service";


interface DoctorProps {
  id: number,
  firstName: string,
  lastName: string
}

export default function ScreenshotModal({ examId, fiducialStates, examData, examMetadata, isLoadingExamData, diagnosticStates, closeModal }: any) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerHeight * 1.8,
    minWidth: 1000,
    minHeight: 800,
    height: window.innerHeight * 0.95,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const doctors: DoctorProps[] = [
    {
      "id": 2,
      "firstName": "Erling",
      "lastName": "Haaland"
    },
    {
      "id": 6,
      "firstName": "Pedro",
      "lastName": "Torres"
    },
    {
      "id": 7,
      "firstName": "Rene",
      "lastName": "Guerrero"
    }
  ];

  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const { t } = useTranslation();

  const [whatsappMessageStatus, setWhatsappMessageStatus] = useState("");

  const handleSelectedDoctorChange = (event: SelectChangeEvent<number | null>) => {
    setSelectedDoctorId(event.target.value as number);
  };

  const handleSendScreenshot = async () => {
    const element = document.getElementById('capture');
    if (element) {
      const capture = await html2canvas(element);
      const imageBlob = ImageToBlobParser(capture);
      const fileName = `exam_${examId}.png`;
      const formData = createFormData(imageBlob, fileName, selectedDoctorId);
      try {
        await sendImageToDoctor(formData);
        setWhatsappMessageStatus(`Screenshot sent to the Doctor`);
      }
      catch {
        setWhatsappMessageStatus(`Screenshot wasn't able to be sent`);
      }
    }
  };

  const handleCapture = async () => {
    const element = document.getElementById('capture');
    if (element) {
      const capture = await html2canvas(element);
      const dataURL = capture.toDataURL();
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `exam_${examId}.png`;
      link.click();
    }
  };

  return (
    <Box sx={style}>
      <Stack alignItems="center" spacing={2} direction="row" height={'100%'} width={'100%'}>
        <Box className="print-layout" id="capture" style={{ width: '90%', height: '100%' }}>
          <Grid container style={{ width: '100%', height: '100%' }}>
            <ScreenshotComponent examId={examId} fiducialStates={fiducialStates} analisisData={examData}
              examMetadata={examMetadata} isLoading={isLoadingExamData} diagnosticStates={diagnosticStates} />
          </Grid>
        </Box>
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
          <FormControl sx={{ m: 3, minWidth: 100, width: '16ch' }}>
            <InputLabel>{t("selectDoctor")}</InputLabel>
            <Select
              value={selectedDoctorId}
              onChange={handleSelectedDoctorChange}
            >
              {doctors.map((doctor) => (
                <MenuItem
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.firstName} {doctor.lastName}
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
            disabled={selectedDoctorId == null}
            onClick={handleSendScreenshot}>
            <Typography fontStyle={"bold"} color={"#ffffff"}>
              {t("sendToDoctor")}
            </Typography>
          </Button>
          <Typography fontStyle={"bold"} color={"Black"}>
            {whatsappMessageStatus}
          </Typography>
        </Stack>
      </Stack>
    </Box>);
};
