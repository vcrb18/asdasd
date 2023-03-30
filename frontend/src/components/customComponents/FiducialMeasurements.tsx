import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getExamPredictedMarkersComputations } from "../../service/user.service";

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
  const [computationPoints, setComputationPoints] = useState<Measurements>();
  useEffect(() => {
    getExamPredictedMarkersComputations(props.examId).then(
      (response) => {
        setComputationPoints(response.data)
        console.log("computationPoints");
        console.log(computationPoints);
      },
      (error) => {
        const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
        setComputationPoints(_content);
      }
    )
  }, []);

  // const arr = computationPoints?.rr;
  // const afc = computationPoints?.fc;
  // const apq = computationPoints?.pq;
  // const aqrs = computationPoints?.qrs;
  // const aqt = computationPoints?.qt;
  // const aqtc = computationPoints?.qtc;
  // const ast = computationPoints?.st;
  // const row = computationPoints;

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
              color: "#404040"
            }}
          >
            <TableCell align="center" sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }} > FC [lpm]</TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              RR [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              PQ [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              QRS [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              QT [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              QTc [ms]
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              ST [mm]
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}>{row.fc.toFixed(1)}</TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              {row.rr.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              {row.pq.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              {row.qrs.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              {row.qt.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
            >
              {row.qtc.toFixed(1)}
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD", fontSize: '50%' }}
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