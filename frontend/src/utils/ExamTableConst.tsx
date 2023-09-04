import { createTheme, styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
  
export interface RowProps {
    row: ExamData;
    isMatch: boolean;
  }
  
export interface Patient {
  patientId: number,
  birth: string,
  gender: string,
  identifier: string,
  name: string,
  lastName: string
}

export interface ExamData {
  examId: number;
  patient: Patient;
  createdAt: string;
  deadline: string;
  urgency: number;
  remainingTime: string,
  operatorReview: boolean;
  results: string;
  accepted: boolean;
  operatorAccept: boolean | null;
  locked: boolean | null;
  lockedBy: string;
  organizationLegalName: string;
  screenshot: boolean;
}

export interface ExamTableProps {
  applyFilter: boolean;
  filterStateCondition: filterOption;
  filterReviewCondition: filterOption;
  filterId: string; 
  }

export interface ExamTableGroupBProps {
  applyFilter: boolean;
  filterScreenshotCondition: filterOption;
  filterId: string; 
}

export interface ExamHeadTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string | number | boolean;
  }

export interface ExamTableResponse {
  rows: [],
  count: number
}

export interface Header {
  id: string;
  label: string;
}

export interface ExamHeadTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string | number | boolean;
  columns: Header[];
  mobileColumns: Header[];
}
  
export type Order = "asc" | "desc"

export type filterOption = "" | "true" | "false";

export type FormInput = {
  folioSearch: string;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E4EDEF",
    color: "#007088",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#878787", 
  },
}));

export const buttonsTheme = createTheme({
	palette: {
		primary: {
			main: "#007088",
		},
	},
});

export const columns: Header[] = [
  { 
    id: "folio",
    label: "Folio",
  },
  {
    id: "medicalCenter",
    label: "medicalCenter",
  },
  {
    id: "patient",
    label: "patient",
  },
  {
    id: "date",
    label: "date",
  },
  {
    id: "timeLeft",
    label: "timeLeft",
  },
  {
    id: "state",
    label: "state",
  },
  {
    id: "urgency",
    label: "urgency",
  },
  {
    id: "review",
    label: "review",
  },
  {
    id: "results",
    label: "results",
  },
];

export const mobileColumns: Header[] =[
  {
    id: "results",
    label: "results",
  },
  {
    id: "urgency",
    label: "urgency",
  },
  {
    id: "timeLeft",
    label: "timeLeft",
  },
]

export const columnsGroupB: Header[] = [
  { 
    id: "folio",
    label: "Folio",
  },
  {
    id: "medicalCenter",
    label: "medicalCenter",
  },
  {
    id: "patient",
    label: "patient",
  },
  {
    id: "date",
    label: "date",
  },
  {
    id: "sentToDoctor",
    label: "sentToDoctor",
  },
  {
    id: "capture",
    label: "capture",
  },
  {
    id: "results",
    label: "results",
  },
];

export const mobileColumnsGroupB: Header[] = [
  {
    id: "results",
    label: "results",
  },
  {
    id: "capture",
    label: "capture",
  },
  {
    id: "sentToDoctor",
    label: "sentToDoctor",
  },
]
