import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "folio" | "fecha" | "estado" | "urgencia" | "revisado";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: boolean) => string;
}

const columns: readonly Column[] = [
  { id: "folio", label: "Folio", align: "center" },
  { id: "fecha", label: "Fecha de recepción", align: "center" },
  {
    id: "estado",
    label: "Estado",
    align: "center",
    format: (value: boolean) => (value ? "Aceptado" : "Rechazado"),
  },
  {
    id: "urgencia",
    label: "Urgencia",
    align: "center",
    format: (value: boolean) => (value ? "Urgente" : "Normal"),
  },
  {
    id: "revisado",
    label: "Revisado",
    align: "center",
    format: (value: boolean) => (value ? "Si" : "No"),
  },
];

interface Data {
  folio: string;
  fecha: Date;
  estado: boolean;
  urgencia: boolean;
  revisado: boolean;
}

function createData(
  folio: string,
  fecha: Date,
  estado: boolean,
  urgencia: boolean,
  revisado: boolean
): Data {
  return { folio, fecha, estado, urgencia, revisado };
}

const rows = [
  createData("F-11312", new Date(), true, true, true),
  createData("F-11314", new Date(), false, false, true),
  createData("F-11315", new Date(), false, true, true),
  createData("F-11316", new Date(), true, false, true),
  createData("F-11317", new Date(), true, false, false),
];

export default function CustomizedTables(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
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
}
