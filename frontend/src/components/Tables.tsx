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
  id:
    | "folio"
    | "paciente"
    | "fecha"
    | "resultados"
    | "algun"
    | "dato"
    | "extra";
  label: string;
  minWidth?: string;
  align?: "center" | "left" | "right";
  format?: (value: number) => string;
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
    id: "resultados",
    label: "Resultados",
    minWidth: "30%",
    align: "center",
    format: (value: number) => {
      return value.toLocaleString();
    },
  },
  {
    id: "algun",
    label: "Algun",
    minWidth: "20%",
    align: "center",
    format: (value: number) => {
      return value.toLocaleString();
    },
  },
  {
    id: "dato",
    label: "Dato",
    minWidth: "20%",
    align: "center",
    format: (value: number) => {
      return value.toLocaleString();
    },
  },
  {
    id: "extra",
    label: "Extra",
    minWidth: "20%",
    align: "center",
    format: (value: number) => {
      return value.toLocaleString();
    },
  },
];

// Chekear los typos de cada una de las categorias
// depediendo de como llegan desde la base de datos
interface Data {
  folio: string;
  paciente: string;
  fecha: string;
  resultados: number;
  algun: string;
  dato: string;
  extra: string;
}

function createData(
  folio: string,
  paciente: string,
  fecha: string,
  resultados: number,
  algun: string,
  dato: string,
  extra: string
): Data {
  return {
    folio,
    paciente,
    fecha,
    resultados,
    algun,
    dato,
    extra,
  };
}
const rows = [
  createData(
    "1",
    "Juan",
    "2020-01-01",
    412,
    "2016",
    "1234567890123456789",
    "as2"
  ),
  createData(
    "1",
    "Juan",
    "2020-01-01",
    412,
    "2016",
    "1234567890123456789",
    "as2"
  ),
  createData(
    "1",
    "Juan",
    "2020-01-01",
    412,
    "2016",
    "1234567890123456789",
    "as2"
  ),
  createData(
    "1",
    "Juan",
    "2020-01-01",
    412,
    "2016",
    "1234567890123456789",
    "as2"
  ),
];

const CustomizedTables: React.FunctionComponent = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      <TableContainer sx={{ maxHeight: 440 }}>
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
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.format != null && typeof value === "number"
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

export default CustomizedTables;
