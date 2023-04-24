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
import { getSuggestedDiagnostic } from "../../service/user.service";
import { useTranslation } from "react-i18next";

const DiagnosisTypes = ["Trasado dentro de los limites", "Ritmo sinusal"];

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

const ParserDiagnostic = (diagnostics: []) => {
  let new_diagnostics: (string | number)[][] = [];
  diagnostics.map((item: (number | string)[])=>{
    const number_ = item[0];
    const text = item[1].toString().replace(/ /g, "_");
    new_diagnostics.push([number_, text]);
  });
  return new_diagnostics;
}

const DiagnosisComponent: React.FC<DiagnosisProps> = ({
  examId,
}): JSX.Element => {
  const [DiagnosticosSugeridos, setDiagnosticosSugerido] = useState<
    (number | string)[][]
  >([]);

  const { t } = useTranslation();

  useEffect(() => {
    getSuggestedDiagnostic(examId, 3).then(
      (res) => {
        // .map((element: string )=>{
        //   element
        // })
        const data_parser = ParserDiagnostic(res.data[1]);
        setDiagnosticosSugerido(data_parser);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setDiagnosticosSugerido(_content);
      }
    );
  }, []);
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
    setDiagnosticosSugerido(DiagnosticosSugeridos.filter((i) => i[1].toString() !== item));
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
        {DiagnosticosSugeridos.map((item: (number | string)[]) => (
          <DeletableBoxItem
            label={item[1] ? t(item[1].toString()) : ""}
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
