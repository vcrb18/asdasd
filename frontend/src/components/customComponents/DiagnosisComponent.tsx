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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography color={"#000000"}>
            Are you sure you want to delete {label}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface SuggestedDiagnostic {
  prediction_id?: number;
  exam_id?: number;
  algorithm_type_id?: number;
  value_name?: string;
  value_type?: string;
  value?: string;
}

interface DiagnosisProps {
  examId: number;
}

const DiagnosisComponent: React.FC<DiagnosisProps> = ({
  examId,
}): JSX.Element => {
  const [DiagnosticosSugeridos, setDiagnosticosSugerido] = useState<
    SuggestedDiagnostic[]
  >([]);

  useEffect(() => {
    getSuggestedDiagnostic(examId, 3).then(
      (res) => {
        // .map((element: string )=>{
        //   element
        // })
        setDiagnosticosSugerido(res.data);
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
    setDiagnosticosSugerido(DiagnosticosSugeridos.filter((i) => i !== item));
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
          Diagnosticos sugeridos
        </Typography>
      </Box>
      <Box>
        {DiagnosticosSugeridos.map((item) => (
          <DeletableBoxItem
            label={item.value ? item.value : ""}
            onDelete={handleDelete}
          />
        ))}
        <IconButton size="small" edge={"end"} onClick={handleAdd}>
          <AddIcon fontSize={"inherit"} sx={{ color: "#36c513" }} />
        </IconButton>
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
          <DialogTitle>Add Pathology</DialogTitle>
          <DialogContent>
            <TextField
              label="New Item"
              fullWidth
              autoFocus
              value={newItem}
              onChange={(event) => {
                setNewItem(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button
              onClick={handleAddDialogSubmit}
              variant="contained"
              color="error"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default DiagnosisComponent;
