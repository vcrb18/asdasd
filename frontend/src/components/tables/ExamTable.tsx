import { ChangeEvent, useEffect, useState } from "react";
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
import { getExamsByFilter } from "../../service/user.service";
import { columns, mobileColumns, ExamData, Order, ExamTableProps, ExamTableResponse, ExamsByFilterParams } from "../../utils/ExamTableConst";
import { AxiosResponse } from "axios";
import ExamTableHead from "./ExamTableHead";
import ExamTableRow from "./ExamTableRow";

function ExamTable({
  applyFilter,
  filterStateCondition,
  filterReviewCondition,
  filterId
}: ExamTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("fecha");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [maxRows, setMaxRows] = useState(20);
  const [rows, setRows] = useState<ExamData[]>([]);

  const handleRequestSort = (
    _event: any,
    property: string  
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowsResponse = (response: AxiosResponse<ExamTableResponse,any>, newExams: ExamData[]) => {
    try{
      response.data.rows.forEach((examData: ExamData) => {
        newExams.push(examData);
      });  
    } catch(error){
      console.error(error);
    }
  }

  useEffect(()=> {
    setIsLoading(true);
    const examsByFilterParams: ExamsByFilterParams = {
      searchInt: filterId,
      page: page,
      order: 11,
      acceptedFilter: filterStateCondition,
      reviewFilter: filterReviewCondition,
      screenshotFilter: "both",
      reportFilter: "both",
    }
    getExamsByFilter(examsByFilterParams).then((response) => {
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

  const isMatchMd = useMediaQuery(useTheme().breakpoints.up("md"))
  return (
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
                <CircularProgress/>
              </TableBody>
            )
            :(
              <TableBody>
                {rows.map((row: ExamData) => <ExamTableRow row={row} isMatch={isMatchMd} />)}
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
  )
};

export default ExamTable;
