import {
  Autocomplete,
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
import { getSuggestedDiagnostic, getDiagnosticTypes, createDoctorDiagnostic, getDoctorDiagnostics, deleteDoctorDiagnostics, getDiagnosticPredictions, markDiagnosticPredictionNotDisplayable } from "../../service/user.service";
import { useTranslation } from "react-i18next";
import xButton from "../../static/images/xButton.png"
import { Diagnostic, DoctorDiagnostic, DiagnosticStates, DiagnosticPrediction, DiagnosticDataBase } from "../views/ExamsView";


const DeletableBoxItem = ({
  id,
  label,
  accuracy,
  onDelete,
}: {
  id: number;
  label: string;
  accuracy: string | undefined;
  onDelete: (item: string, id: number) => void;
}): JSX.Element => {
  //   const [hovered, setHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleDeleteClick = (): void => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (): void => {
    setDeleteDialogOpen(false);
    onDelete(label, id);
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
        {accuracy ? 
          <Grid container
            display={"flex"}
            marginLeft={"1%"}
          >
            <Grid item xs={9} sm={9} md={9} lg={9} display={'flex'} justifyContent={'center'} alignItems={"center"} >
            <Typography fontSize={"65%"} fontWeight={"bold"} align="left">
              {label}
            </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} display={'flex'} justifyContent={'flex-start'} alignItems={"center"}>
              <Typography fontSize={"65%"} fontWeight={"bold"} align="left">
                {accuracy}
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} display={'flex'} justifyContent={'flex-end'} alignItems={"center"}>
              <Button
                onClick={handleDeleteClick}
              >
                <Avatar src={xButton} alt={"checkVerde"} variant={"circular"}  />
              </Button>
            </Grid>
          </Grid>
            :
            <Grid container
            display={"flex"}
            marginLeft={"1%"}
          >
            <Grid item xs={9} sm={9} md={9} lg={9} display={'flex'} justifyContent={'center'} alignItems={"center"} >
            <Typography fontSize={"65%"} fontWeight={"bold"} align="left">
              {label}
            </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={1} lg={3} display={'flex'} justifyContent={'flex-end'} alignItems={"center"}>
              <Button
                onClick={handleDeleteClick}
              >
                <Avatar src={xButton} alt={"checkVerde"} variant={"circular"}  />
              </Button>
            </Grid>
          </Grid>
    }
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

interface DiagnosisProps {
  examId: number;
  diagnosticStates: DiagnosticStates;
}

const ParserDiagnostic = (diagnostics: [], listOfDiagnostics: (Diagnostic)[]) => {
  let newDiagnostics: (DiagnosticPrediction)[] = [];
  diagnostics.map((item: DiagnosticDataBase)=>{
    let newObject: undefined | Diagnostic = listOfDiagnostics.find(object => object.diagnosticId == item.diagnosticId);
    if (newObject && item.display){
      newDiagnostics.push({
        ...newObject,
        accuracy: item.accuracy,
      });
    }
  });
  return newDiagnostics;
}

const ParserDoctorDiagnostic = (doctorDiagnostics: any, listOfDiagnostics: (Diagnostic)[]) => {
  let newDiagnostics: (Diagnostic)[] = [];
  doctorDiagnostics.map((item: any)=>{
    let newObject: Diagnostic | undefined = listOfDiagnostics.find(object => object.diagnosticId === item.diagnosticId);
    if (newObject){
      newDiagnostics.push(newObject);
    }
  });
  return newDiagnostics;
}


const DiagnosisComponent: React.FC<DiagnosisProps> = ({
  examId, diagnosticStates
}): JSX.Element => {

  const [diagnosticTypes, setDiagnosticTypes] = useState<(Diagnostic)[]>([]);

  useEffect(() => {
    getDiagnosticTypes().then(
      (res) => {
        let diagnostics: (Diagnostic)[] = []
        res.data.map((diagnostic: { diagnosticId: number; diagnostic: string; order: number;}) => {
          diagnostics.push({
            diagnosticId: diagnostic.diagnosticId,
            diagnostic: diagnostic.diagnostic,
            order: diagnostic.order,
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

  const {
    diagnosticosSugeridos,
    setDiagnosticosSugeridos,
    doctorDiagnostics,
    setDoctorDiagnostics } = diagnosticStates;

  const { t } = useTranslation();

  useEffect(() => {
    if(diagnosticTypes.length === 0) return;
    getDiagnosticPredictions(examId).then(
      (res) => {
        const diagnosticDataParser = ParserDiagnostic(res.data, diagnosticTypes);
        diagnosticDataParser.sort(function(first, second){return first.order - second.order});
        setDiagnosticosSugeridos(diagnosticDataParser);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setDiagnosticosSugeridos(_content);
      }
    );
  }, [diagnosticTypes]);

  useEffect(() => {
    if(diagnosticTypes.length === 0) return;
    getDoctorDiagnostics(examId).then(
      (res) => {
        const newDoctorDiagnostics: (Diagnostic)[] = ParserDoctorDiagnostic(res.data, diagnosticTypes);
        newDoctorDiagnostics.sort(function(first, second){return first.order - second.order});
        setDoctorDiagnostics(newDoctorDiagnostics);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setDoctorDiagnostics(_content);
      }
    );
  }, [diagnosticTypes]);  

  const [newItem, setNewItem] = useState<Diagnostic | null>();

  const handleDeleteDiagnosticoSugerido = (item: string, id: number): void => {
    setDiagnosticosSugeridos(diagnosticosSugeridos.filter((i) => i?.diagnostic.toString() !== item));
    markDiagnosticPredictionNotDisplayable(examId, id);
  };

  const handleDeleteDoctorDiagnostic = (item: string, id: number): void => {
    setDoctorDiagnostics(doctorDiagnostics.filter((i) => i?.diagnosticId !== id));
    deleteDoctorDiagnostics(examId, id);
  };

  const handleAdd = (): void => {
    setOpenAddDialog(true);
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const handleOptionSelect = (event: any, newValue: Diagnostic | null) => {
    setNewItem(newValue);
  };
  const handleAddDialogClose = (): void => {
    setOpenAddDialog(false);
    setNewItem(null);
  };
  const handleAddDialogSubmit = (): void => {
    if(newItem){
      createDoctorDiagnostic(examId, newItem.diagnosticId);
      let newObject: Diagnostic | undefined = diagnosticTypes.find(object => object.diagnosticId == newItem.diagnosticId);
      if (newObject) {
        const newDoctorDiagnostics = [...doctorDiagnostics, newObject];
        newDoctorDiagnostics.sort(function(first, second){return first.order - second.order});
        setDoctorDiagnostics(newDoctorDiagnostics);
      }
    }
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
        {diagnosticosSugeridos.length>0 && diagnosticosSugeridos.map((item: DiagnosticPrediction) => (
          <DeletableBoxItem
            key={item.diagnosticId}
            id={item.diagnosticId}
            label={item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
            accuracy={(item.accuracy*100).toFixed(1) + "%"}
            onDelete={handleDeleteDiagnosticoSugerido}
          />
        ))}
        {doctorDiagnostics.length>0 && doctorDiagnostics.map((item: Diagnostic) => (
          <DeletableBoxItem
            key={item.diagnosticId}
            id={item.diagnosticId}
            label={item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
            accuracy={undefined}
            onDelete={handleDeleteDoctorDiagnostic}
          />
        ))}
        <IconButton size="small" edge={"end"} onClick={handleAdd}>
          <AddIcon fontSize={"inherit"} sx={{ color: "#007088" }} />
        </IconButton>
        <Dialog fullWidth={false} maxWidth={"sm"}  open={openAddDialog} onClose={handleAddDialogClose}>
          <DialogTitle>{t("add")} {t("patology")}</DialogTitle>
          <DialogContent>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.diagnostic === value.diagnostic}
              getOptionLabel={(option) => option.diagnostic}
              value={newItem || null}
              onChange={handleOptionSelect}
              id="select-diagnostic"
              options={diagnosticTypes}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params}/>}
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
