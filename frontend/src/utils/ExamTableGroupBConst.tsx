import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { createTheme, styled } from "@mui/material/styles";

export type FormInput = {
    folioSearch: string;
}

export type filterOption = "" | "true" | "false";

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

export interface ExamTableProps {
applyFilter: boolean;
filterStateCondition: filterOption;
filterReviewCondition: filterOption;
filterId: string; 
}

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
      id: "screenshot",
      label: "Screenshot",
    },
    {
      id: "capture",
      label: "Capture",
    },
    {
      id: "results",
      label: "results",
    },
  ];

export interface Header {
id: string;
label: string;
}

export type Order = "asc" | "desc";

export interface ExamHeadTableProps2 {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string | number | boolean;
    columns: Header[];
    mobileColumns: Header[];
  }

export const mobileColumns: Header[] = [
    {
      id: "results",
      label: "results",
    },
    {
      id: "capture",
      label: "Capture",
    },
    {
      id: "screenshot",
      label: "Screenshot",
    },
  ]

export const buttonsTheme = createTheme({
	palette: {
		primary: {
			main: "#007088",
		},
	},
});
