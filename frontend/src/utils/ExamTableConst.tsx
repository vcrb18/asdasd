
export interface Column {
    id: "folio"| "timeLeft" | "patient" | "date" | "state" | "urgency" | "review"| "results";
    label: string;
    align?: "center" | "left" | "right";
    minWidth?: string;
    format?:
      | ((value: number) => string)
      | ((value: boolean) => string)
      | ((value: string) => string);
  }
  
export interface RowProps {
    row: ExamData;
    isMatch: boolean;
  }
  
  
export const columns: readonly Column[] = [
    { id: "folio", label: "Folio", minWidth: "30%", align: "center" },
    {
      id: "patient",
      label: "patient",
      align: "center",
    },
    {
      id: "date",
      label: "date",
      align: "center",
      format: (value: string) => {
        return value.replace("T", " ");
      },
  
    },
    {
      id: "timeLeft",
      label: "timeLeft",
      minWidth: "20%",
      align: "center",
      format: (value: string) => {
        return value.replace("T", " ");
      },
    },
    {
      id: "state",
      label: "state",
      align: "center",
      format: (value: boolean) => {
        const returnValue = value ? "Aceptado" : "Rechazado";
        return returnValue;
      },
    },
    {
      id: "urgency",
      label: "urgency",
      align: "center",
      format: (value: number) => {
        const returnValue = value === 1 ? "Urgente" : "Normal";
        return returnValue;
      },
    },
    {
      id: "review",
      label: "review",
      align: "center",
    },
    {
      id: "results",
      label: "results",
      align: "center",
    },
  ];
  
export const mobileColumns: readonly Column[] =[
    {
      id: "urgency",
      label: "urgency",
      align: "center",
    },
    {
      id: "review",
      label: "review",
      align: "center",
    },
    {
      id: "timeLeft",
      label: "timeLeft",
      align: "center",
    },
    {
      id: "results",
      label: "results",
      align: "center",
    },
  ]
  
  // Chekear los typos de cada una de las categorias
  // depediendo de como llegan desde la base de datos
export interface ExamData {
    examId: number;
    patientId: string | null;
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
  }
  
export type Order = "asc" | "desc"

export type filterStateTypes = {
    rejected: boolean,
    accepted: boolean,
  }
export type filterReviewTypes = {
    reviewed: boolean,
    notReviewed: boolean,
}
export type filter = {
    review: filterReviewTypes,
    state: filterStateTypes
}
export interface ExamTableProps {
    filterStates: filterStateTypes;
    filterReview: filterReviewTypes;
    useStateFilter: boolean;
    useReviewFilter: boolean;
    useIdFilter: boolean;
    filterId: string; 
}
export interface ExamHeadTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string | number | boolean;
  }