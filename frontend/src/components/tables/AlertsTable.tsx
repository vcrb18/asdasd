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
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
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
  id: "folio" | "fecha" | "estado" | "urgencia" | "patologia" | "resultados";
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
    id: "fecha",
    label: "date",
    minWidth: "30%",
    align: "center",
    format: (value: string) => {
      return value.replace("T", " ");
    },
    // format: (value: number) => {
    //   return new Date(value).toLocaleDateString();
    // },
  },
  {
    id: "estado",
    label: "state",
    minWidth: "20%",
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
    id: "patologia",
    label: "patology",
    align: "center",
    minWidth: "40%",
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
  fecha: string;
  estado: boolean;
  urgencia: number;
  patologia: string;
  resultados: string;
}

function createData(
  folio: string,
  fecha: string,
  estado: boolean,
  urgencia: number,
  patologia: string,
  resultados: string
): Data {
  return {
    folio,
    fecha,
    estado,
    urgencia,
    patologia,
    resultados,
  };
}
const rows = [
  createData(
    "1",
    "2023-01-20T17:38:06.664148",
    true,
    0,
    "Arritmia Constante",
    "false"
  ),
  createData("2", "2020-02-01T02:39:46.671206", true, 1, "", "false"),
  createData("3", "2020-03-01T04:39:46.671206", false, 1, "", "false"),
  createData("4", "2020-01-13T16:39:46.671206", true, 0, "", "false"),
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

function AlertTable(): JSX.Element {
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
                const fecha = row.fecha.includes("T")
                  ? row.fecha.replace("T", " ").split(".")[0]
                  : row.fecha.split(".");
                const estadoIcon = row.estado ? (
                  <Brightness1RoundedIcon color={"success"} />
                ) : (
                  <Brightness1RoundedIcon color={"error"} />
                );
                const urgenciaText =
                  row.urgencia === 1 ? (
                    <Typography color={"red"}>{t('urgency')}</Typography>
                  ) : (
                    <Typography>{t('normal')}</Typography>
                  );

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.folio}>
                    <StyledTableCell align="center">
                      {row.folio}
                    </StyledTableCell>
                    <StyledTableCell align="center">{fecha}</StyledTableCell>
                    <StyledTableCell align="center">
                      {estadoIcon}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {urgenciaText}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.patologia}
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

export default AlertTable;
