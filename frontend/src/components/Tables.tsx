import * as React from 'react';
import Paper  from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

//Nombres de las columnas que tendremos que 
//obtener desde la base de datos

interface Column{
    id: "folio" | "paciente" | "fecha" | "resultados";
    label: string;
    minWidth?: string;
    align?: 'center' | 'left' | 'right';
    format?: (value: number) => string;
}

const columns: ReadonlyArray<Column> = [
    { id: "folio", label: "Folio", minWidth: '20%'},
    { id: "paciente", label: 'Nombre paciente', align: 'center', minWidth: '20%'},
    {
        id: "fecha",
        label: "Fecha",
        minWidth: '20%',
        align: "center",
        format: (value: number) => {
            return new Date(value).toLocaleDateString();
        }
    },
    {
        id: "resultados",
        label: "Resultados",
        minWidth: '20%',
        align: "center",
        format: (value: number) => {
            return value.toLocaleString();
        }
    }
  ];

  //Chekear los typos de cada una de las categorias
  //depediendo de como llegan desde la base de datos
interface Data{
    folio: string;
    paciente: string;
    fecha: string;
    resultados: number;
}

function createData(
    folio: string,
    paciente: string,
    fecha: string,
    resultados: number,
): Data{
    return {
      folio,
      paciente,
      fecha,
      resultados
    };
  };
const rows = [
    createData('1', 'Juan', '2020-01-01',412),
    createData('1', 'Juan', '2020-01-01',412),
    createData('1', 'Juan', '2020-01-01',412),
    createData('1', 'Juan', '2020-01-01',412),
]


  export default function CustomizedTables() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{width: '100%', overflow:'hidden' }}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="Examenes">
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.folio}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.format && typeof value == 'number'?
                                                column.format(value): value}
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
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>
        )
                    }
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