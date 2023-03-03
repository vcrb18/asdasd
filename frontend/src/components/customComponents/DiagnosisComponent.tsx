import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import AddIcon from "@mui/icons-material/Add";

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
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography fontSize={"70%"} sx={{ color: "#000000" }}>
            {label}
          </Typography>
          <IconButton
            size="small"
            edge={"end"}
            onClick={handleDeleteClick}
            sx={{ backgroundColor: "#e45c64" }}
          >
            <ClearSharpIcon fontSize={"inherit"} />
          </IconButton>
        </Box>
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

const DiagnosisComponent = (): JSX.Element => {
  const [items, setItems] = useState(DiagnosisTypes);
  const [newItem, setNewItem] = useState("");

  const handleDelete = (item: string): void => {
    setItems(items.filter((i) => i !== item));
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
    if (newItem !== "") {
      setItems([...items, newItem]);
    }
    setNewItem("");
    setOpenAddDialog(false);
  };
  return (
    <>
      <Box width={"100%"} mb={"5%"} display={"flex"}>
        <Typography color={"#000000"} fontSize={"80%"}>
          Diagnosticos sugeridos
        </Typography>
      </Box>
      <Box>
        {items.map((item) => (
          <DeletableBoxItem key={item} label={item} onDelete={handleDelete} />
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
