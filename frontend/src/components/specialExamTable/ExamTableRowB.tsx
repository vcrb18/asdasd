import { ThemeProvider } from "@emotion/react";
import { TableRow, Typography, IconButton, Collapse, Grid, Button, Modal } from "@mui/material";
import { useState } from "react";
import { RowProps, StyledTableCell, buttonsTheme } from "../../utils/ExamTableConst";
import { NavigateFunction, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from "react-i18next";
import ScreenshotModal from "../customComponents/screenshotModal";
import { getExam, getExamDataSistemed2 } from "../../service/user.service";
import { ExamMetadata } from "../../utils/MetadataTransforms";
import { FiducialStates } from "../views/ExamsView";
import { formatDate, getChecks, getStatus } from "../../utils/ExamTableFunctions";

function ExamTableRowB({ row, isMatch }: RowProps) {  
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const handleAccess = (examId: number, locked: boolean | null) => {
	if(!locked){
		navigate(`/examsview/${examId}`);
	}
  }

  const [open, setOpen] = useState(false);
  const [openScreenshot, setOpenScreenshot] = useState(false);
  const [examData, setExamData] = useState();
  const [examMetadata, setExamMetadata] = useState<ExamMetadata>();

  const [fidP, setFidP] = useState(0);
  const [fidQRS, setFidQRS] = useState(0);
  const [fidR, setFidR] = useState(0);
  const [fidR2, setFidR2] = useState(0);
  const [fidS, setFidS] = useState(0);
  const [fidST, setFidST] = useState(0);
  const [fidT, setFidT] = useState(0);
  const fiducialStates: FiducialStates = {
	fidP: fidP, setFidP: setFidP,
	fidQRS: fidQRS, setFidQRS: setFidQRS,
	fidR: fidR, setFidR: setFidR,
	fidR2: fidR2, setFidR2: setFidR2,
	fidS: fidS, setFidS: setFidS,
	fidST: fidST, setFidST: setFidST,
	fidT: fidT, setFidT: setFidT
  };

  const handleOpenModal = async () => {
	try{
	  const responseExamData = await getExam(row.examId);
	  setExamData(responseExamData.data);

  	  const responseExamMetaData = await getExamDataSistemed2(row.examId);
	  setExamMetadata({
		patientId: responseExamMetaData.data.PatientId,
		birthday: responseExamMetaData.data.Birthday,
		gender: responseExamMetaData.data.Gender,
		backgrounds: Object.entries(responseExamMetaData.data.Backgrounds).map(([key, value]: [string, any]) => {
			return { id: value.ID, name: value.NAME };
		}),
		medications: Object.entries(responseExamMetaData.data.Medications).map(([key, value]: [string, any]) => {
			return { id: value.ID, name: value.NAME, dose: value.DOSE };
		}),
		symptoms: Object.entries(responseExamMetaData.data.Symptoms).map(([key, value]: [string, any]) => {
			return { id: value.ID, name: value.NAME, days: value.DAYS, hours: value.HOURS };
		}),
		identifier: responseExamMetaData.data.Identifier,
		name: responseExamMetaData.data.Name,
		lastName: responseExamMetaData.data.LastName,
		});
  } catch(error){
	console.error(error);
  }

	setOpenScreenshot(true);
  }
  const handleCloseModal = () => setOpenScreenshot(false);

  if (isMatch) {
    return (    
    <>
	  <TableRow hover role="checkbox" tabIndex={-1} key={row.examId}>
		<StyledTableCell align="center">
		  <Typography fontSize={"100%"} fontWeight={"bold"}>
		    {row.examId}
		  </Typography>
		</StyledTableCell>

		<StyledTableCell align="left"  >
		  {row.organizationLegalName}
		</StyledTableCell> 

		<StyledTableCell align="left"  >
		  {row.patient.name} {row.patient.lastName}
		</StyledTableCell> 

		<StyledTableCell align="center">
		  {formatDate(row.createdAt)}
		</StyledTableCell> 

		<StyledTableCell align="center">
		  {getChecks(row.screenshot)}
		</StyledTableCell>

		<StyledTableCell align="center">
		  <ThemeProvider theme={buttonsTheme}>
			<Button
			onClick={handleOpenModal}
			color="primary"
			variant="contained"
			sx={{ color: "#fff" }}
			value={row.examId}
			>
			  <Typography fontSize={'120%'} color={'#fff'}>
				{t("captureScreenshot")}
			  </Typography>
			</Button>
		  </ThemeProvider>
		</StyledTableCell>

		<StyledTableCell align="center">
		  <ThemeProvider theme={buttonsTheme}>
			<Button
			onClick={() => handleAccess(row.examId, row.locked)}
			color="primary"
			variant="contained"
			sx={{ color: "#fff" }}
			value={row.examId}
			>
		 	  <Typography fontSize={'120%'} color={'#fff'}>
				{row.locked === true ? t("locked") : t("view")}
			  </Typography>
			</Button>
		  </ThemeProvider>
		</StyledTableCell>
	  </TableRow>
	  <Modal
	    open={openScreenshot}
	    onClose={handleCloseModal}
	    aria-labelledby="modal-modal-title"
	    aria-describedby="modal-modal-description"
	  >
		<ScreenshotModal examId={row.examId} fiducialStates={fiducialStates} examData={examData}
		examMetadata={examMetadata} isLoadingExamData={""} diagnosticStates={""} closeModal={handleCloseModal}
		/>
	  </Modal>
	</>
)
}
else {
	return(
		<>
		  <TableRow hover role="checkbox" tabIndex={-1} key={row.examId} sx={{ '& > *': { borderBottom: 'unset' } }}>
			<StyledTableCell align="center">
			  <ThemeProvider theme={buttonsTheme}>
				<Button
				  onClick={() => handleAccess(row.examId, row.locked)}
				  color="primary"
				  variant="contained"
				  sx={{ color: "#fff" }}
				  value={row.examId}
				>
				  <Typography fontSize={'120%'} color={'#fff'}>
					{row.locked === true ? t("locked") : t("view")}
				  </Typography>
				</Button>
			  </ThemeProvider>
			</StyledTableCell>

			<StyledTableCell align="center">
			  <ThemeProvider theme={buttonsTheme}>
				<Button
				  onClick={handleOpenModal}
				  color="primary"
				  variant="contained"
				  sx={{ color: "#fff" }}
				  value={row.examId}
				>
				  <Typography fontSize={'120%'} color={'#fff'}>
				    {t("Capture")}
				  </Typography>
				</Button>
			  </ThemeProvider>
			</StyledTableCell>

			<StyledTableCell align="center">
			  {getChecks(row.screenshot)}
			</StyledTableCell>

			<StyledTableCell>
			  <IconButton
				aria-label="expand row"
				size="small"
				onClick={() => setOpen(!open)}
			  >
				{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			  </IconButton>
			</StyledTableCell>
		  </TableRow>
		  <TableRow>
			<StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			  <Collapse in={open} timeout="auto" unmountOnExit>
				<Grid container spacing={1} paddingY={"1%"}>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("patient")}
					</Typography>
				  </Grid>
				  <Grid item xs={4} sm={4} md={4} lg={4}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {row.patient.name} {row.patient.lastName}
					</Typography>
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("folio")}
					</Typography>
				  </Grid>
				  <Grid item xs={4} sm={4} md={4} lg={4}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {row.examId}
					</Typography>
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("medicalCenter")}
					</Typography>
				  </Grid>
				  <Grid item xs={4} sm={4} md={4} lg={4}>
				    {row.organizationLegalName}
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("date")}
					</Typography>
				  </Grid>
				  <Grid item xs={4} sm={4} md={4} lg={4}>
					{formatDate(row.createdAt)}
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("state")}
					</Typography>
				  </Grid>
				  <Grid item xs={4} sm={4} md={4} lg={4}>
					{getStatus(row.operatorAccept ?? row.accepted)}
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2}>
					<Typography fontSize={"100%"} fontWeight={"bold"}>
					  {t("review")}
					</Typography>
				  </Grid>
				  <Grid item xs={2} sm={2} md={2} lg={2} >
					{getChecks(row.operatorReview)}
				  </Grid>
				</Grid>
			  </Collapse>
			</StyledTableCell>
		  </TableRow>
		  <Modal
		    open={openScreenshot}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		  >
			<ScreenshotModal examId={row.examId} fiducialStates={fiducialStates} examData={examData}
			examMetadata={examMetadata} isLoadingExamData={""} diagnosticStates={""} closeModal={handleCloseModal}
			/>
		  </Modal>
		</>
	)
}
};

export default ExamTableRowB;
