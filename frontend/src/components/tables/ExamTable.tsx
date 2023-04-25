import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Check from "../../static/images/checkVerde.png"
import X from "../../static/images/X.png"
import {
  Avatar,
  Box,
  Button,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
// import authHeader from "../../service/auth.header";
import { getExams, getExamsCount, useExams } from "../../service/user.service";
// import { type NavigateFunction, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { log } from "console";


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
  id: "folio" | "paciente" | "fecha" | "estado" | "urgencia" | "review"| "resultados";
  label: string;
  align?: "center" | "left" | "right";
  minWidth?: string;
  format?:
    | ((value: number) => string)
    | ((value: boolean) => string)
    | ((value: string) => string);
}

const columns: readonly Column[] = [
  { id: "folio", label: "Folio", minWidth: "30%", align: "center" },
  {
    id: "paciente",
    label: "pacient",
    align: "center",
    minWidth: "30%",
  },
  {
    id: "fecha",
    label: "date",
    minWidth: "20%",
    align: "center",
    format: (value: string) => {
      return value.replace("T", " ");
    },

  },
  {
    id: "estado",
    label: "state",
    minWidth: "10%",
    align: "center",
    format: (value: boolean) => {
      const returnValue = value ? "Aceptado" : "Rechazado";
      return returnValue;
    },
  },
  {
    id: "urgencia",
    label: "urgency",
    minWidth: "20%",
    align: "center",
    format: (value: number) => {
      const returnValue = value === 1 ? "Urgente" : "Normal";
      return returnValue;
    },
  },
  {
    id: "review",
    label: "review",
    minWidth: "10%",
    align: "center",
  },
  {
    id: "resultados",
    label: "results",
    minWidth: "30%",
    align: "center",
  },
];

// Chekear los typos de cada una de las categorias
// depediendo de como llegan desde la base de datos
interface Data {
  folio: string;
  paciente: string;
  fecha: string;
  estado: boolean;
  urgencia: number;
  review: boolean;
  resultados: string;
}

function createData(
  folio: string,
  paciente: string,
  fecha: string,
  estado: boolean,
  urgencia: number,
  review: boolean,
  resultados: string
): Data {
  return {
    folio,
    paciente,
    fecha,
    estado,
    urgencia,
    review,
    resultados,
  };
}

interface ExamData {
  exam_id: number;
  patient_id: string | null;
  created_at: string;
  estado: boolean;
  urgencia: number;
  reviews: boolean;
  resultados: string;
  aceptado: boolean;
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
              {t(columns.label)}
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

function colorSwitcher(value: number): string {
  switch (value) {
    case 1:
      return "#878787";
    case 2:
      return "#FF8B00";
    case 3:
      return "red";
    default:
      return "#878787";
  }
}

interface ExamTableProps {
  useFilter: boolean;
  filterId: string; 
}

const ExamTable = ({
  useFilter,
  filterId
}: ExamTableProps) => {
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
  
  const filteredFolio = rows.filter(row => row.exam_id.toString().includes(filterId));  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      <Typography color={"#878787"} fontWeight={"bold"}>
        {date.toLocaleString('es-CL',{timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})}
      </Typography>
      )
  };

  const getStatusIcon = (estado: boolean)  => (
    <Brightness1RoundedIcon color={estado ? "success" : "error"} />
  );

  const getUrgencyText = (urgencia: number) => (
    <Typography color={colorSwitcher(urgencia)} fontWeight={"bold"}>
      {t("urgencyLevel").concat(urgencia.toString())}
    </Typography>
  );
  const getReviewState = (state: boolean) : JSX.Element => {
    console.log(state)
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
  const handleSubmit = (event:  React.MouseEvent<HTMLAnchorElement>, examId: string ) : void => {
  //     event.preventDefault();
  //     navigate('/exams'.concat(examId))
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
        const newExams = response.data.filter((exam: ExamData) => !rows.some(row => row.exam_id === exam.exam_id));
        setRows([...rows, ...newExams]);
      });
      getExamsCount().then((response) => {
        setMaxRows(response.data.count)
      });
    }
    console.log(rows)
    if (shouldLoad) {
      setTimeout(() => setIsLoading(false),200)
    } else {
      setIsLoading(false);
    }
  }, [page])
  const renderRow = (row: ExamData) : JSX.Element => (
    
    <TableRow hover role="checkbox" tabIndex={-1} key={row.exam_id}>
      <StyledTableCell align="center">{row.exam_id}</StyledTableCell>
      <StyledTableCell align="center">{row.patient_id}</StyledTableCell>
      <StyledTableCell align="center">
        {formatDate(row.created_at)}
      </StyledTableCell>  
      <StyledTableCell align="center">{getStatusIcon(row.aceptado)}</StyledTableCell>
      <StyledTableCell align="center">{getUrgencyText(row.urgencia)}</StyledTableCell>
      <StyledTableCell align="center">{getReviewState(row.reviews)}</StyledTableCell>
      <StyledTableCell align="center">
        <ThemeProvider theme={buttonsTheme}>
          <Link to={`/examsview/${row.exam_id}`}>
            <Button
              color="primary"
              variant="contained"
              sx={{ color: "#fff" }}
              value={row.exam_id}
            >
              <Typography fontSize={'120%'} color={'#fff'}>
                {t("access")}
              </Typography>
            </Button>
          </Link>
        </ThemeProvider>
      </StyledTableCell>
    </TableRow>
  );
  const sortedRows = useFilter
    ? stableSort(filteredFolio, getComparator(order, orderBy))
    : stableSort(rows, getComparator(order, orderBy));

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
    );

    console.log("PR", paginatedRows);


  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            </TableBody>
           )
           :(
            <TableBody>
              {/* {isEmptyArray(filteredFolio) && (filterId !== "") &&? */}
              {paginatedRows.map((row: ExamData) => renderRow(row))}
               {/* : <Typography>No hay resutados para {filterId} </Typography>}   */}
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
  )
};

export default ExamTable;
