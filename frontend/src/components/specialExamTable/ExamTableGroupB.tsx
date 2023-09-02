import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import {
  TableContainer,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import { getExamsByFilter2 } from "../../service/user.service";
import { ExamData, ExamTableResponse } from "../../utils/ExamTableConst";
import { AxiosResponse } from "axios";
import ExamTableHead from "../tables/ExamTableHead";
import ExamTableRowB from "./ExamTableRowB";
import { ExamTableProps, Order, StyledTableCell, columns, mobileColumns } from "../../utils/ExamTableGroupBConst";


const ExamTableGroupB = ({
  applyFilter,
  filterStateCondition,
  filterReviewCondition,
  filterId
}: ExamTableProps): JSX.Element => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("fecha");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [maxRows, setMaxRows] = React.useState(20);
  const [rows, setRows] = React.useState<ExamData[]>([]);

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

  const handleRowsResponse = (response: AxiosResponse<ExamTableResponse,any>, newExams: ExamData[]): void => {
    response.data.rows.forEach((examData: ExamData) => {
      newExams.push(examData);
    });  
  }

  useEffect(()=> {
    setIsLoading(true);
    getExamsByFilter2(filterId, page, 11, filterStateCondition, filterReviewCondition).then((response) => {
      setMaxRows(response.data.count);
      const newExams: ExamData[] = [];
      handleRowsResponse(response, newExams);
      setRows(newExams);
    });
    setIsLoading(false);
  }, [applyFilter, page]);

  useEffect(()=> {
    setPage(0);
  }, [applyFilter]);


  const isMatchMd = useMediaQuery(useTheme().breakpoints.up("md"));

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
             columns={columns}
             mobileColumns={mobileColumns}
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
              {rows.map((row: ExamData) => <ExamTableRowB row={row} isMatch={isMatchMd} />)}
            </TableBody>)
          }
          </Table>
        </TableContainer>
        <TablePagination
         rowsPerPageOptions={[25]}
         component="div"
         count={maxRows}
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

export default ExamTableGroupB;
