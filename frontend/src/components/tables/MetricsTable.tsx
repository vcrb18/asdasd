import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import {
  Box,
  Button,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from "react-i18next";
// Styled head bar on the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c7dff9",
    color: "#404040",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Nombres de las columnas que tendremos que
// obtener desde la base de datos
interface Column {
  id:
    | "folio"
    | "estado"
    | "puntos"
    | "error rr"
    | "error fc"
    | "error qt"
    | "error qtc"
    | "error st"
    | "resultados";
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
    id: "estado",
    label: "state",
    align: "center",
    minWidth: "40%",
  },
  {
    id: "puntos",
    label: "fiducialPoints",
    minWidth: "30%",
    align: "center",
  },
  {
    id: "error rr",
    label: "Error RR",
    minWidth: "20%",
    align: "center",
  },
  {
    id: "error fc",
    label: "Error FC",
    minWidth: "20%",
    align: "center",
  },
  {
    id: "error qt",
    label: "Error QT",
    minWidth: "20%",
    align: "center",
  },
  {
    id: "error qtc",
    label: "Error QTc",
    minWidth: "20%",
    align: "center",
  },
  {
    id: "error st",
    label: "Error ST",
    minWidth: "20%",
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
  estado: string;
  puntos: string;
  errorRR: string;
  errorFC: string;
  errorQT: string;
  errorQTc: string;
  errorST: string;
  resultados: string;
}

function createData(
  folio: string,
  estado: string,
  puntos: string,
  errorRR: string,
  errorFC: string,
  errorQT: string,
  errorQTc: string,
  errorST: string,
  resultados: string
): Data {
  return {
    folio,
    estado,
    puntos,
    errorRR,
    errorFC,
    errorQT,
    errorQTc,
    errorST,
    resultados,
  };
}
const rows = [
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
  createData(
    "1",
    "Bien Aceptado",
    "Medido",
    "3.4%",
    "40.5%",
    "12.3%",
    "34.3%",
    "93.4%",
    "Acceder"
  ),
];

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
function stableSort<T>(array: Data[], comparator: (a: T, b: T) => number): any {
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
  const { order, orderBy, onRequestSort } = props;
  const { t } = useTranslation();

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

function colorSwitcher(value: string): string {
  switch (value) {
    case "Aceptado":
      return "black";
    case "Bien Aceptado":
      return "green";
    case "Bien Rechazado":
      return "green";
    case "Mal Aceptado":
      return "orange";
    case "Mal Rechazado":
      return "orange";
    case "Rechazado":
      return "red";
    default:
      return "black";
  }
}

function MetricsTable(): JSX.Element {
  const { t } = useTranslation();
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#c7dff9",
      },
    },
  });
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("fecha");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="Examenes">
          <ExamTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Data) => {
                const estados = (
                  <Typography color={colorSwitcher(row.estado)}>
                    {t(row.estado)}
                  </Typography>
                );
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.folio}>
                    <StyledTableCell align="center">
                      {row.folio}
                    </StyledTableCell>
                    <StyledTableCell align="center">{estados}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.puntos}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.errorRR}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.errorFC}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.errorQT}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.errorQTc}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.errorST}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <ThemeProvider theme={buttonsTheme}>
                        <Button
                          href={row.resultados}
                          color="primary"
                          variant="contained"
                          sx={{ color: "#006a6b" }}
                        >
                          Acceder
                        </Button>
                      </ThemeProvider>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MetricsTable;
