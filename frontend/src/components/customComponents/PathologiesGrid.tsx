import React, { useState } from 'react';
import { Box, Grid, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import AddIcon from '@mui/icons-material/Add';

const patologías = [
    'arritmia',
    'bloqueo ventricular',
    'pato1', 
    'pato2'
]


const DeletableGridItem = ({ label, onDelete }: { label: string, onDelete: (item: string) => void }): JSX.Element => {
//   const [hovered, setHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () : void=> {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () : void => {
    setDeleteDialogOpen(false);
    onDelete(label);
  };

  const handleDeleteCancel = () : void => {
    setDeleteDialogOpen(false);
  };

  return (
    <Grid
      container
    //   onMouseEnter={() => { setHovered(true) }}
    //   onMouseLeave={() => { setHovered(false) }}
      lg={8}
      md={10}
      xs={12}
      justifyContent={'center'}
      alignItems={'center'}

    >   
    
        <Grid item lg={5} xs={12}>
            <Box display={"flex"} justifyContent={"center"} alignItems={'center'}
            >
                <Typography fontSize={"80%"} sx={{color: '#000000'}}>{label}</Typography>
            </Box>
        </Grid>
        <Grid item lg={1}>
            <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            sx={{backgroundColor: "#e45c64"}}
            >   
                <IconButton size='small' edge={'end'} onClick={handleDeleteClick}>
                    <ClearSharpIcon fontSize={'inherit'} />
                </IconButton>
            </Box>
        </Grid>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {label}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
};



const PatoGrid = (): JSX.Element =>  {
    const [items, setItems] = useState(patologías);
    const [newItem, setNewItem] = useState('');

    const handleDelete = (item: string): void => {
        setItems(items.filter((i) => i !== item));
    };

    const handleAdd = () : void => {
        setNewItem('');
        setOpenAddDialog(true);
    }

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const handleAddDialogClose = (): void => {
        setOpenAddDialog(false);
    };
    const handleAddDialogSubmit = (): void => {
        if (newItem !== '') {
          setItems([...items, newItem]);
        }
        setNewItem('');
        setOpenAddDialog(false);
      };
  return (
    <Grid container lg={12}>
      {items.map((item) => (
        <Grid item lg={6} md={6} sx={{backgroundColor: '#36c513'}} justifyContent={'center'} alignItems={'center'} key={item}>
            <DeletableGridItem key={item} label={item} onDelete={handleDelete} />
        </Grid>
          ))}
        <Grid item lg={3}>
            <IconButton size='small' edge={'end'} onClick={handleAdd}>
            	    <AddIcon fontSize={'inherit'} sx={{color: '#36c513'}}/>
            </IconButton>
        </Grid>
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <TextField
                label="New Item"
                fullWidth
                autoFocus
                value={newItem}
                onChange={(event) => {setNewItem(event.target.value)}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddDialogSubmit} variant="contained" color="error">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>    
  );
};

export default PatoGrid;