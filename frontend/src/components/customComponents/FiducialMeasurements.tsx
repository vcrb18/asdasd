import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getExamPredictedMarkersComputations } from "../../service/user.service";
import { Typography } from "@mui/material";

interface Measurements {
  examId: number;
  fc: number;
  rr: number;
  pq: number;
  qrs: number;
  qt: number;
  qtc: number;
  st: number;
}

function createData(
  examId: number,
  fc: number,
  rr: number,
  pq: number,
  qrs: number,
  qt: number,
  qtc: number,
  st: number
): Measurements {
  return { examId, fc, rr, pq, qrs, qt, qtc, st };
}

const FiducialMeasurementsTable = (props: any): JSX.Element => {
  const [computationPoints, setComputationPoints] = useState<Measurements>({
    examId: 0,
    fc: 0,
    rr: 0,
    pq: 0,
    qrs: 0,
    qt: 0,
    qtc: 0,
    st: 0,
  });
  useEffect(() => {
    getExamPredictedMarkersComputations(props.examId).then(
      (response) => {
        console.log(response.data);
        setComputationPoints(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setComputationPoints(_content);
      }
    );
  }, []);

  // const rr = computationPoints? computationPoints.rr : 0;
  // const fc = computationPoints? computationPoints.fc : 0;
  // const pq = computationPoints? computationPoints.pq : 0;
  // const qrs = computationPoints? computationPoints.qrs: 0;
  // const qt = computationPoints? computationPoints.qt : 0;
  // const qtc = computationPoints? computationPoints.qtc : 0;
  // const st = computationPoints? computationPoints.st: 0;
  // const row = computationPoints;
  const rr = props.fidR2 - props.fidR;
  const fc = (1000 * 60) / rr;
  const pq = props.fidQRS - props.fidP;
  const qrs = props.fidS - props.fidQRS;
  const qt = props.fidT - props.fidQRS;
  const qtc = (1000 * qt) / 1000 / Math.sqrt(rr / 1000);
  const st = (25 / 1000) * (props.fidST - props.fidS);

  const row = createData(props.examId, fc, rr, pq, qrs, qt, qtc, st);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#E4EDEF",
              color: "#007088",
            }}
          >
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD",}}
            >
              <Typography fontWeight={"bold"} color={"#007088"}>
                FC [lpm]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                RR [ms]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                PQ [ms]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                QRS [ms]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                QT [ms]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                QTc [ms]
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                ST [mm]
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.fc.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.rr.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.pq.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.qrs.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.qt.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.qtc.toFixed(0)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ border: 1, borderColor: "#DDDDDD"}}
            >
              <Typography fontWeight={"bold"}>
                {row.st.toFixed(1)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FiducialMeasurementsTable;
