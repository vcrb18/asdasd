import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  const rr = Math.abs(props.fidR2 - props.fidR);
  const fc = (1000 * 60) / rr;
  const pq = props.fidQRS - props.fidP;
  const qrs = props.fidS - props.fidQRS;
  const qt = props.fidT - props.fidQRS;
  const qtc = (1000 * qt) / 1000 / Math.sqrt(rr / 1000);
  const st = (props.timeSeries.length > props.fidST) ? props.timeSeries[props.fidST] * 0.01 : 0;

  const row = createData(props.examId, fc, rr, pq, qrs, qt, qtc, st);

  return (
    <TableContainer >
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
                {row.st.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FiducialMeasurementsTable;
