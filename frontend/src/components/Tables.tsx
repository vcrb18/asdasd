import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

// Styled head bar on the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Nombres de las columnas que tendremos que
// obtener desde la base de datos
interface Column {
  id: keyof Data;
  label: string;
  align?: "center" | "left" | "right";
  minWidth?: string;
  format?: ((value: number) => string) | ((value: boolean) => string);
}

const columns: readonly Column[] = [
  { id: "folio", label: "Folio", minWidth: "30%" },
  {
    id: "paciente",
    label: "Nombre paciente",
    align: "center",
    minWidth: "40%",
  },
  {
    id: "fecha",
    label: "Fecha",
    minWidth: "30%",
    align: "center",
    format: (value: number) => {
      return new Date(value).toLocaleDateString();
    },
  },
  {
    id: "estado",
    label: "Estado",
    minWidth: "20%",
    align: "center",
    format: (value: boolean) => {
      const returnValue = value ? "Aceptado" : "Rechazado";
      return returnValue;
    },
  },
  {
    id: "urgencia",
    label: "Urgencia",
    minWidth: "20%",
    align: "center",
    format: (value: number) => {
      const returnValue = value === 1? "Urgente" : "Normal";
      ;
      return returnValue;
    },
  },
  {
    id: "resultados",
    label: "Resultados",
    minWidth: "30%",
    align: "center",
    format: (value: boolean) => {
      const returnValue = value ? "Si" : "No";
      return returnValue;
    },
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
  resultados: boolean;
}

function createData(
  folio: string,
  paciente: string,
  fecha: string,
  estado: boolean,
  urgencia: number,
  resultados: boolean
): Data {
  return {
    folio,
    paciente,
    fecha,
    estado,
    urgencia,
    resultados,
  };
}
const rows = [
  createData("1", "Juan", "2020-01-01", true, 0, false),
  createData("1", "Juan", "2020-01-01", true, 1, false),
  createData("1", "Juan", "2020-01-01", false, 1, false),
  createData("1", "Juan", "2020-01-01", true, 2, false),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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

interface ExamTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | number | boolean;
}

function ExamTable (props: ExamTableProps) : JSX.Element {
  const {order, orderBy, onRequestSort} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
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
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="Examenes">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.folio}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.format != null && (typeof value === "boolean" || typeof value === "number")
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
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
};
// const columns = readonly Column[] = [
//     { id: "name", label: "Name", minWidth: 100},
//     { id: "code", label: 'ISO\u00a0code', minwidth: 100},
//     {
//         id: "population",
//         label: "Population",
//         minWidth: 100,
//         align: "right",
//         format: (value:number) => {
//             return value.toLocaleString();
//         }
//     }
// ]

// function Table(){
//     return(
//         <h1>Table</h1>
//     )
// }

export default ExamTable;
