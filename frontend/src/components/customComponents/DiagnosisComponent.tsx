import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
import xButton from "../../static/images/xButton.png"


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
      <Box display={"flex"} flexDirection={"row"} maxWidth={"100%"} marginY={"1%"}
      sx={{border: 1,
        borderColor: "#E4EDEF",
        borderRadius: "1%",
      }}>
          <Grid container
            display={"flex"}
          >
            <Grid item xs={9} sm={9} md={9} lg={9} display={'flex'} justifyContent={'flex-start'} alignItems={"center"} >
            <Typography fontSize={"65%"} fontWeight={"bold"}>
              {label}
            </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} display={'flex'} justifyContent={'flex-end'} alignItems={"center"}>
              <Button
                onClick={handleDeleteClick}
              >
                <Avatar src={xButton} alt={"checkVerde"} variant={"circular"}  />
              </Button>
            </Grid>
          </Grid>
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography fontWeight={"bold"}>
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
          <Typography fontWeight={"bold"} color={"#ffffff"}>
            {t("delete")}
          </Typography>

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
        setDiagnosticosSugerido(res.data[1]);
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
  console.log(DiagnosticosSugeridos);

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
        <Typography fontWeight={"bold"} fontSize={"130%"}>
          {t("suggestedDiagnoses")}
        </Typography>
      </Box>
      <Box width={"100%"}>
        {DiagnosticosSugeridos.map((item: (number | string)[]) => (
          <DeletableBoxItem
            label={item[1] ? item[1].toString() : ""}
            onDelete={handleDelete}
          />
        ))}
        <IconButton size="small" edge={"end"} onClick={handleAdd}>
          <AddIcon fontSize={"inherit"} sx={{ color: "#007088" }} />
        </IconButton>
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
          <DialogTitle>{t("add")} {t("patology")}</DialogTitle>
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
