import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import AddIcon from "@mui/icons-material/Add";
import { getSuggestedDiagnostic, getDiagnosticTypes } from "../../service/user.service";
import { useTranslation } from "react-i18next";

interface Diagnostic {
  diagnosticId: number,
  diagnostic: string,
}

const DeletableBoxItem = ({
  label,
  onDelete,
}: {
  label: string;
  onDelete: (item: string) => void;
}): JSX.Element => {
  //   const [hovered, setHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleDeleteClick = (): void => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (): void => {
    setDeleteDialogOpen(false);
    onDelete(label);
  };

  const handleDeleteCancel = (): void => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"row"}>
        <Paper sx={{ width: "98%", margin: "1%" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            marginRight={"3%"}
          >
            <Typography fontSize={"70%"} sx={{ color: "#000000" }}>
              {label}
            </Typography>
            <IconButton
              size="small"
              edge={"end"}
              onClick={handleDeleteClick}
              sx={{ color: "#e45c64" }}
            >
              <ClearSharpIcon fontSize={"inherit"} />
            </IconButton>
          </Box>
        </Paper>
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography color={"#000000"}>
            {t("askBeforeDeleting")} {label}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>{t("cancel")}</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
/*
interface SuggestedDiagnostic {
  prediction_id?: number;
  exam_id?: number;
  algorithm_type_id?: number;
  value_name?: string;
  value_type?: string;
  value?: string;
}
*/
interface DiagnosisProps {
  examId: number;
}

const ParserDiagnostic = (diagnostics: [], listOfDiagnostics: (Diagnostic)[]) => {
  let newDiagnostics: (Diagnostic)[] = [];
  diagnostics.map((item: (number | string)[])=>{
    const text = item[1].toString();
    let newObject: undefined | Diagnostic = listOfDiagnostics.find(object => object.diagnostic == text);
    if (!newObject){
      newObject = {
        diagnosticId: 404,
        diagnostic: "Diagnóstico no registrado",
      }
    }
    newDiagnostics.push(newObject);
  });
  return newDiagnostics;
}

const DiagnosisComponent: React.FC<DiagnosisProps> = ({
  examId,
}): JSX.Element => {

  const [diagnosticTypes, setDiagnosticTypes] = useState<(Diagnostic)[]>([]);

  useEffect(() => {
    getDiagnosticTypes().then(
      (res) => {
        let diagnostics: (Diagnostic)[] = []
        res.data.map((diagnostic: { diagnostic_id: any; diagnostic: any; }) => {
          diagnostics.push({
            diagnosticId: diagnostic.diagnostic_id,
            diagnostic: diagnostic.diagnostic,
          });
        });
        setDiagnosticTypes(diagnostics);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setDiagnosticTypes(_content);
      }
    );
  }, []);

  const [DiagnosticosSugeridos, setDiagnosticosSugerido] = useState<(Diagnostic)[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    if(diagnosticTypes.length === 0) return;
    getSuggestedDiagnostic(examId).then(
      (res) => {
        // .map((element: string )=>{
        //   element
        // })
        const dataParser = ParserDiagnostic(res.data[1], diagnosticTypes);
        setDiagnosticosSugerido(dataParser);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setDiagnosticosSugerido(_content);
      }
    );
  }, [diagnosticTypes]);
  //console.log(DiagnosticosSugeridos);

  // const [items, setItems] = useState<string[]>([]);
  // useEffect(() => {
  //   DiagnosticosSugeridos.map((item) =>
  //   {
  //     item.value? setItems([...items, item.value]) : null
  //   })
  // }, [] );

  const [newItem, setNewItem] = useState("");

  const handleDelete = (item: string): void => {
    setDiagnosticosSugerido(DiagnosticosSugeridos.filter((i) => i?.diagnostic.toString() !== item));
  };

  const handleAdd = (): void => {
    setNewItem("");
    setOpenAddDialog(true);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAddDialogClose = (): void => {
    setOpenAddDialog(false);
  };
  const handleAddDialogSubmit = (): void => {
    // if (newItem !== '') {
    //   setDiagnosticosSugerido([...DiagnosticosSugeridos, newItem]);
    // }
    setNewItem("");
    setOpenAddDialog(false);
  };
  return (
    <>
      <Box width={"100%"} mb={"5%"} display={"flex"} justifyContent={"center"}>
        <Typography color={"#000000"} fontSize={"80%"}>
          {t("suggestedDiagnoses")}
        </Typography>
      </Box>
      <Box>
        {DiagnosticosSugeridos.map((item: Diagnostic | undefined) => (
          <DeletableBoxItem
            key={item?.diagnosticId}
            label={item?.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
            onDelete={handleDelete}
          />
        ))}
        <IconButton size="small" edge={"end"} onClick={handleAdd}>
          <AddIcon fontSize={"inherit"} sx={{ color: "#36c513" }} />
        </IconButton>
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
          <DialogTitle>{t("add")}{t("patology")}</DialogTitle>
          <DialogContent>
            <TextField
              label={t("newItem")}
              fullWidth
              autoFocus
              value={newItem}
              onChange={(event) => {
                setNewItem(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>{t("cancel")}</Button>
            <Button
              onClick={handleAddDialogSubmit}
              variant="contained"
              color="error"
            >
              {t("submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default DiagnosisComponent;
