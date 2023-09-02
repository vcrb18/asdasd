import { ThemeProvider } from "@emotion/react";
import { TableRow, Typography, IconButton, Collapse, Grid, Avatar, Box, Button, Modal } from "@mui/material";
import React from "react";
import { RowProps } from "../../utils/ExamTableConst";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"
import { NavigateFunction, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from "react-i18next";
import { StyledTableCell, buttonsTheme } from "../../utils/ExamTableGroupBConst";
import ScreenshotModal from "../customComponents/screenshotModal";
import { getExam, getExamDataSistemed2 } from "../../service/user.service";
import { ExamMetadata } from "../../utils/MetadataTransforms";
import { FiducialStates } from "../views/ExamsView";

function ExamTableRowB({ row, isMatch }: RowProps): JSX.Element {  
  const { t } = useTranslation();
	const navigate: NavigateFunction = useNavigate();

	const handleAccess = (examId: number, locked: boolean | null) => {
		if(!locked){
			navigate(`/examsview/${examId}`);
		}
	}

	const formatDate = (dateString: string): JSX.Element => {
		const date = new Date(dateString);
		return (
			<Typography color={"#878787"} fontWeight={"bold"}>
			{date.toLocaleString('es-CL',{timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})}
			</Typography>
			)
	};
	
	const getReviewState = (state: boolean): JSX.Element => (
		<Box display="flex" justifyContent="center">
			<Avatar src={state ? Check : X} alt={state ? "checkVerde" : "checkRojo"} variant="square" />
		</Box>
	);
	
	const colorSwitcher = (value: boolean): string => {
		return value ? "green" : "red";
	}
	
	const getStatus = (state: boolean)=> (
		<Typography
			fontWeight={"bold"}
			color={colorSwitcher(state)}
			>
				{state?  t("accepted") : t("rejected")}
	</Typography>
	);
  
	const [open, setOpen] = React.useState(false);
	const [openScreenshot, setOpenScreenshot] = React.useState(false);
	const [examData, setExamData] = React.useState();
	const [examMetadata, setExamMetadata] = React.useState<ExamMetadata>();

	const [fidP, setFidP] = React.useState(0);
	const [fidQRS, setFidQRS] = React.useState(0);
	const [fidR, setFidR] = React.useState(0);
	const [fidR2, setFidR2] = React.useState(0);
	const [fidS, setFidS] = React.useState(0);
	const [fidST, setFidST] = React.useState(0);
	const [fidT, setFidT] = React.useState(0);
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
		} catch{

		}

		setOpenScreenshot(true);
	}
	const handleCloseModal = () => setOpenScreenshot(false);

	if (isMatch) {
		return (    
		<React.Fragment>
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
					Robinson Crusoe
					{/*row.patient.name} {row.patient.lastName*/}
				</StyledTableCell> 

				<StyledTableCell align="center">
						{formatDate(row.createdAt)}
				</StyledTableCell> 

				<StyledTableCell align="center">
						{getReviewState(false)}
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
         		examMetadata={examMetadata} isLoadingExamData={""} diagnosticStates={""} closeModal={handleCloseModal}/>
    		</Modal>
		</React.Fragment>
	)
}
	else {
		return(
			<React.Fragment>
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
						{getReviewState(false)}
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
										{getReviewState(row.operatorReview)}
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
					examMetadata={examMetadata} isLoadingExamData={""} diagnosticStates={""} closeModal={handleCloseModal}/>
				</Modal>
			</React.Fragment>
		)
	}
};

export default ExamTableRowB;
