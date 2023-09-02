import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { useMediaQuery, TableHead, TableRow, TableSortLabel, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExamHeadTableProps2, StyledTableCell } from "../../utils/ExamTableGroupBConst";

function ExamTableHead({order, orderBy, onRequestSort, columns, mobileColumns}: ExamHeadTableProps2): JSX.Element {
    const { t } = useTranslation();
    const createSortHandler =
      (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
    const isMatchMd = useMediaQuery(useTheme().breakpoints.up("md"));
    if (isMatchMd){ 
      return (
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={"center"}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  <Typography fontSize={"100%"} fontWeight={"bold"}>
                    {t(column.label)}
                  </Typography>
                  {orderBy === column.id ? (
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
            {mobileColumns.map((column) => (
              <StyledTableCell key={column.id} align={"center"}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  <Typography fontSize={"100%"} fontWeight={"bold"}>
                    {t(column.label)}
                  </Typography>
                  {orderBy === column.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
            ))}
            <StyledTableCell align={"center"}>
            </StyledTableCell>
          </TableRow>
        </TableHead>
      );
    }
  }

export default ExamTableHead
