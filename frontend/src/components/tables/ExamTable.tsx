import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ThemeProvider, createTheme, styled, useTheme } from "@mui/material/styles";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import authHeader from "../../service/auth.header";
import { getExams, getExamsCount, useExams } from "../../service/user.service";
// import { type NavigateFunction, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Footer from "../customComponents/Footer"


const API_URL = "http://localhost:8080/";
// Styled head bar on the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E4EDEF",
    color: "#007088",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#878787", 
  },
}));

// Nombres de las columnas que tendremos que
// obtener desde la base de datos
interface Column {
  id: "folio"| "timeLeft" | "patient" | "date" | "state" | "urgency" | "review"| "results";
  label: string;
  align?: "center" | "left" | "right";
  minWidth?: string;
  format?:
    | ((value: number) => string)
    | ((value: boolean) => string)
    | ((value: string) => string);
}

interface RowProps {
  row: ExamData;
  isMatch: boolean;
}


const columns: readonly Column[] = [
  { id: "folio", label: "Folio", minWidth: "30%", align: "center" },
  {
    id: "patient",
    label: "patient",
    align: "center",
  },
  {
    id: "date",
    label: "date",
    align: "center",
    format: (value: string) => {
      return value.replace("T", " ");
    },

  },
  {
    id: "timeLeft",
    label: "Remaning time",
    minWidth: "20%",
    align: "center",
    format: (value: string) => {
      return value.replace("T", " ");
    },
  },
  {
    id: "state",
    label: "state",
    align: "center",
    format: (value: boolean) => {
      const returnValue = value ? "Aceptado" : "Rechazado";
      return returnValue;
    },
  },
  {
    id: "urgency",
    label: "urgency",
    align: "center",
    format: (value: number) => {
      const returnValue = value === 1 ? "Urgente" : "Normal";
      return returnValue;
    },
  },
  {
    id: "review",
    label: "review",
    align: "center",
  },
  {
    id: "results",
    label: "results",
    align: "center",
  },
];

const mobileColumns: readonly Column[] =[
  {
    id: "urgency",
    label: "urgency",
    align: "center",
  },
  {
    id: "review",
    label: "review",
    align: "center",
  },
  {
    id: "timeLeft",
    label: "timeLeft",
    align: "center",
  },
  {
    id: "results",
    label: "results",
    align: "center",
  },
]

// Chekear los typos de cada una de las categorias
// depediendo de como llegan desde la base de datos
interface ExamData {
  examId: number;
  patientId: string | null;
  createdAt: string;
  deadline: string;
  status: boolean;
  urgency: number;
  operatorReview: boolean;
  results: string;
  accepted: boolean;
  operatorAccept: boolean | null;
  locked: boolean | null;
  lockedBy: string;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: ExamData[],
  comparator: (a: T, b: T) => number
): any {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface ExamHeadTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string | number | boolean;
}

function ExamTableHead(props: ExamHeadTableProps): JSX.Element {
  const { t } = useTranslation();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const isMatchMd = useMediaQuery(useTheme().breakpoints.up("md"));
  if (isMatchMd){ 
    return (
      <TableHead>
        <TableRow>
          {columns.map((columns) => (
            <StyledTableCell key={columns.id} align={columns.align}>
              <TableSortLabel
                active={orderBy === columns.id}
                direction={orderBy === columns.id ? order : "asc"}
                onClick={createSortHandler(columns.id)}
              >
                <Typography fontSize={"100%"} fontWeight={"bold"}>
                  {t(columns.label)}
                </Typography>
                {orderBy === columns.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  else {
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell align={"center"}>
          </StyledTableCell>
          {mobileColumns.map((columns) => (
            <StyledTableCell key={columns.id} align={columns.align}>
              <TableSortLabel
                active={orderBy === columns.id}
                direction={orderBy === columns.id ? order : "asc"}
                onClick={createSortHandler(columns.id)}
              >
                <Typography fontSize={"100%"} fontWeight={"bold"}>
                  {t(columns.label)}
                </Typography>
                {orderBy === columns.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

function colorSwitcher(value: boolean): string {
  switch (value) {
    case true:
      return "green";
    case false:
      return "red";
    default:
      return "red";
  }
}
interface ExamTableProps {
  useFilter: boolean;
  filterId: string; 
}
const ExamTable = ({
  useFilter,
  filterId
}: ExamTableProps): JSX.Element => {
  const { t } = useTranslation();
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#007088",
      },
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("fecha");
  const [page, setPage] = React.useState(0);
  const [maxPage, setMaxPage] = React.useState(-1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [maxRows, setMaxRows] = React.useState(20);
  const [rows, setRows] = React.useState<ExamData[]>([]);
  
  const filteredFolio = rows.filter(row => row.examId.toString().includes(filterId));

  const formatDate = (dateString: string): JSX.Element => {
    const date = new Date(dateString);
    return (
      <Typography color={"#878787"} fontWeight={"bold"}>
        {date.toLocaleString('es-CL',{timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})}
      </Typography>
      )
  };

  const getRemainingTime = (deadline: string): JSX.Element => {
    const deadlineDate = new Date(deadline);
    const hardcodedExtraTime = 5
    deadlineDate.setHours(deadlineDate.getHours() + hardcodedExtraTime);
    const currentDate = new Date();
    const remaningTime = deadlineDate.getTime() - currentDate.getTime();
    let ago = ''
    let remaningTimeColor = "green";
    const elapsedTime = remaningTime;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    if (days < 0 || hours < 0 || seconds < 0)
    {
      ago = 'ago';
      remaningTimeColor = 'red';
    }
    let remainingTimeString = `${Math.abs(days)} days ${ago}`;
    if (days === 0)
      remainingTimeString = `${Math.abs(hours)}:${Math.abs(minutes)} hours ${ago}`;
    if (days === 0 && hours === 0)
      remainingTimeString = `${Math.abs(minutes)}:${Math.abs(seconds)} minutes ${ago}`;
    if (days === 0 && hours === 0 && minutes <= 0)
      remainingTimeString = `${Math.abs(seconds)} seconds ${ago}`;
    return (
      <Typography color={remaningTimeColor} fontWeight={"bold"}>
        {remainingTimeString}
      </Typography>
      )
  };
  const getStatus = (state: boolean)=> (
    <Typography
      fontWeight={"bold"}
      color={colorSwitcher(state)}
      >
        {state?  t("accepted") : t("refused")}
  </Typography>
  );

  const getUrgency= (urgency: number) => {
    switch (urgency) {
        case 1:
          return(
            <Brightness1RoundedIcon color={"success"} />
        )
        case 2:
          return (
            <Brightness1RoundedIcon color={"warning"} />
          )
        case 3:
          return(
            <Brightness1RoundedIcon color={"error"} />
          )
        }
    }
   
  const getReviewState = (state: boolean) : JSX.Element => {
    if (state === true) {
      return(
        <Box display={"flex"} justifyContent={"center"}>
          <Avatar src={Check} alt={"checkVerde"} variant={"square"}/>
        </Box>
      )
    } else {
      return (
        <Box display={"flex"} justifyContent={"center"}>
          <Avatar src={X} alt={"checkRojo"} variant={"square"}/>
        </Box>
        )
    }
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string  
  ): void => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setMaxPage(-1)
  };

  useEffect(()=> {
    setIsLoading(true);
    let shouldLoad = false
    if (page > maxPage) {
      shouldLoad = true
      setMaxPage(page)
      getExams(page, 11).then((response) => {
        const newExams: ExamData[] = [];
        response.data.map((examData: any) => {
          newExams.push({
            examId: examData.exam_id,
            patientId: examData.patient_id,
            createdAt: examData.created_at,
            deadline: examData.created_at,
            status: examData.estado,
            urgency: examData.urgencia,
            operatorReview: examData.operator_review,
            results: examData.resultados,
            accepted: examData.aceptado,
            operatorAccept: examData.operator_accept,
            locked: examData.locked,
            lockedBy: examData.lockedBy,
          });
        });
        const newExamsFiltered = newExams.filter((exam: ExamData) => !rows.some(row => row.examId === exam.examId));
        setRows([...rows, ...newExamsFiltered]);
        return Promise
      }).catch((error) => {
        console.error(error);
      });
      getExamsCount().then((response) => {
        setMaxRows(response.data.count)
      }).catch((error) => {
        console.error(error)
      });
    }
    if (shouldLoad) {
      setTimeout(() => {
        setIsLoading(false)
      },200)
    } else {
      setIsLoading(false);
    }
  }, [page])
  const navigate: NavigateFunction = useNavigate();

  const handleAccess = (examId: number, locked: boolean | null) => {
    if(!locked){
      navigate(`/examsview/${examId}`);
    }
  }

  const Row: React.FC<RowProps> = ({ row, isMatch }) => {  
    const [open, setOpen] = React.useState(false);
    if (isMatch) {
      return (    
      <React.Fragment>
        <TableRow hover role="checkbox" tabIndex={-1} key={row.examId}>
          <StyledTableCell align="center">
            <Typography fontSize={"100%"} fontWeight={"bold"}>
              {row.examId}
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Typography fontSize={"100%"} fontWeight={"bold"}>
              {row.patientId}
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center">
            {formatDate(row.createdAt)}
          </StyledTableCell> 
          <StyledTableCell align="center">{getRemainingTime(row.createdAt)}</StyledTableCell>  
          <StyledTableCell align="center">{getStatus(row.operatorAccept != null ? row.operatorAccept : row.accepted)}</StyledTableCell>
          <StyledTableCell align="center">{getUrgency(row.urgency)}</StyledTableCell>
          <StyledTableCell align="center">{getReviewState(row.operatorReview)}</StyledTableCell>
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
                  {row.locked === true ? t("locked") : t("access")}
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
            <StyledTableCell>
              <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                  >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </StyledTableCell>
            <StyledTableCell align="center">{getUrgency(row.urgency)}</StyledTableCell>
            <StyledTableCell align="center">{getReviewState(row.operatorReview)}</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
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
                    {row.locked === true ? t("locked") : t("access")}
                  </Typography>
                </Button>
              </ThemeProvider>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                  <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {t("patient")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {row.patientId}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {t("folio")}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {row.examId}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {t("date")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      {formatDate(row.createdAt)}
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography fontSize={"100%"} fontWeight={"bold"}>
                        {t("state")}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {getStatus(row.operatorAccept != null ? row.operatorAccept : row.accepted)}
                    </Grid>
                  </Grid>
                </Collapse>
            </StyledTableCell>
          </TableRow>
        </React.Fragment>
      )
    }
  };

  const sortedRows = useFilter
    ? stableSort(filteredFolio, getComparator(order, orderBy))
    : stableSort(rows, getComparator(order, orderBy));

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
    );


  const isMatchMd = useMediaQuery(useTheme().breakpoints.up("md"))
  return (
    <>
    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
    <Paper sx={{ width: "100%" }}>
       <TableContainer>
         <Table stickyHeader aria-label="Examenes">
           <ExamTableHead
             order={order}
             orderBy={orderBy}
             onRequestSort={handleRequestSort}
           />
           {isLoading ? (
            <TableBody>
              <StyledTableCell align='center'/>
              <StyledTableCell align='center'/>
              <StyledTableCell align='center'/>
              <StyledTableCell align='center'>
                <CircularProgress/>
              </StyledTableCell>
              <StyledTableCell align='center'/>
              <StyledTableCell align='center'/>
              <StyledTableCell align='center'/>
            </TableBody>
           )
           :(
            <TableBody>
              {paginatedRows.map((row: ExamData) => <Row row={row} isMatch={isMatchMd} />)}
            </TableBody>)
          }
          </Table>
        </TableContainer>
        <TablePagination
         rowsPerPageOptions={[25]}
         component="div"
         count={maxRows}
        //  count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
       />
    </Paper>
    </div>
    </>
  )
};

export default ExamTable;
