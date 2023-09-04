import { ThemeProvider } from "@emotion/react";
import { TableRow, Typography, IconButton, Collapse, Grid, Button } from "@mui/material";
import React from "react";
import { RowProps, StyledTableCell, buttonsTheme } from "../../utils/ExamTableConst";
import { formatDate, parseTime, getStatus, getUrgency, getChecks } from "../../utils/ExamTableFunctions";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from "react-i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";

function ExamTableRow({ row, isMatch }: RowProps): JSX.Element { 
    const { t } = useTranslation();
	const navigate: NavigateFunction = useNavigate();

    const [open, setOpen] = React.useState(false);

	const handleAccess = (examId: number, locked: boolean | null) => {
		if(!locked){
			navigate(`/examsview/${examId}`);
		}
	}

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
            {row.patient.name} {row.patient.lastName}
          </StyledTableCell> 
          <StyledTableCell align="center">
            {formatDate(row.createdAt)}
          </StyledTableCell> 
          <StyledTableCell align="center">
            <Typography fontWeight={"bold"}>
              {parseTime(row.remainingTime)}
            </Typography>
          </StyledTableCell>  
          <StyledTableCell align="center">{getStatus(row.operatorAccept ?? row.accepted)}
</StyledTableCell>
          <StyledTableCell align="center">{getUrgency(row.urgency)}</StyledTableCell>
          <StyledTableCell align="center">{getChecks(row.operatorReview)}</StyledTableCell>
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
            <StyledTableCell align="center">{getUrgency(row.urgency)}</StyledTableCell>
            <StyledTableCell align="center">
              <Typography fontWeight={"bold"}>
                {parseTime(row.remainingTime)}
              </Typography>
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
        </React.Fragment>
      )
    }
  };

export default ExamTableRow;
