import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import AddIcon from "@mui/icons-material/Add";

const patologíasexistentes = ["Arritmia", "Bloqueo ventricular", "Pato1", "Pato2"];
const patologies = ["Pato1", "a", "b", "c", "d", "e" , "bloqueo", "Arritmia", "Bloqueo ventricular",'patologia numero 2' ,"Pato3"];


const DeletableGridItem = ({
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
    <Paper sx={{ width: "99%", margin: "1%" }}>
      <Grid
        item
        //   onMouseEnter={() => { setHovered(true) }}
        //   onMouseLeave={() => { setHovered(false) }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={'1%'}
      >
          <Typography fontSize={"60%"} sx={{ color: "#000000" }}>
            {label}
          </Typography>
          <IconButton size="small" edge={"end"} onClick={handleDeleteClick}>
            <ClearSharpIcon fontSize={"inherit"} sx={{ color: "#e45c64" }}/>
          </IconButton>
      </Grid>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete {label}?</Typography>
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
    </Paper>
  );
};

const PatoGrid = (): JSX.Element => {
  const [items, setItems] = useState(patologíasexistentes);
  const [addableItems, setAddableItems] = useState(patologies);
  const [addedPatologies, setAddedPatologies] = useState<string[]>([]);
  const [checked, setChecked] = useState<number[]>([]);

  const handleDelete = (item: string): void => {
    setItems(items.filter((i) => i !== item));
  };

  const handleDelete = (item: string): void => {
    setItems(items.filter((i) => i !== item));
    setAddableItems(addableItems.concat(item));
  };

  const checkForPatologies = (): void => {
    const filteredItems = addableItems.filter(item => !items.includes(item));
    setAddableItems(filteredItems);
  };
  
  const handleToggle = (value: number, item: string) => () => {
    // index del item actual
    const currentIndex = checked.indexOf(value);
    // todos los items checkeados
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setAddedPatologies([...addedPatologies, item]);

    } else {
      newChecked.splice(currentIndex, 1);
      setAddedPatologies(addedPatologies.filter((i) => i!== item));
    }

    setChecked(newChecked);
  };


  const handleAdd = (): void => {
    setAddedPatologies([]);
    checkForPatologies();
    setOpenAddDialog(true);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const handleAddDialogClose = (): void => {
    setChecked([]);
    setOpenAddDialog(false);
  };
  const handleAddDialogSubmit = (): void => {
    if (addedPatologies.length > 0) {
      setItems(items.concat(addedPatologies));
    }
    setChecked([]);
    setAddedPatologies([]);
    setOpenAddDialog(false);
  };
  return (
    <Grid container lg={12}>
      {items.map((item) => (
        <Grid
          item
          lg={6}
          md={6}
          justifyContent={"center"}
          alignItems={"center"}
          key={item}
        >
          <DeletableGridItem key={item} label={item} onDelete={handleDelete} />
        </Grid>
      ))}
      <Grid item lg={3}>
        <IconButton size="small" edge={"end"} onClick={handleAdd}>
          <AddIcon fontSize={"inherit"} />
        </IconButton>
      </Grid>
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Pathology</DialogTitle>
        <DialogContent>
          <List dense sx={{ width: "100%", maxWidth:360, bgcolor: 'Background.paper' }}>
            {addableItems.map((item: string, value: number) => {
              return (
                <ListItem key={value}>
                  <ListItemButton role={undefined} onClick={handleToggle(value, item)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={item} primary={item} />
                  </ListItemButton>
                </ListItem>
              );
            })}

          </List>
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
    </Grid>
  );
};

export default PatoGrid;
