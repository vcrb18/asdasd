import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Measurements {
  fc: number;
  rr: number;
  pq: number;
  qrs: number;
  qt: number;
  qtc: number;
  st: number;
}

function createData(
  fc: number,
  rr: number,
  pq: number,
  qrs: number,
  qt: number,
  qtc: number,
  st: number
): Measurements {
  return { fc, rr, pq, qrs, qt, qtc, st };
}

const FiducialMeasurementsTable = (props: any): JSX.Element => {
  const rr = props.fidR2 - props.fidR;
  const fc = (1000 * 60) / rr;
  const pq = props.fidQRS - props.fidP;
  const qrs = props.fidS - props.fidQRS;
  const qt = props.fidT - props.fidQRS;
  const qtc = (1000 * qt) / 1000 / Math.sqrt(rr / 1000);
  const st = (25 / 1000) * (props.fidST - props.fidS);

  const row = createData(fc, rr, pq, qrs, qt, qtc, st);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#c7dff9",
              color: "#404040",
            }}
          >
            <TableCell align="center"> FC [lpm]</TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              RR [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              PQ [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              QRS [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              QT [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              QTc [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              ST [mm]
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">{row.fc.toFixed(1)}</TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.rr.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.pq.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.qrs.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.qt.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.qtc.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD" }}
            >
              {row.st.toFixed(1)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FiducialMeasurementsTable;
