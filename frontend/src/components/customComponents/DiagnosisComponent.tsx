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
import { getSuggestedDiagnostic, getDiagnosticTypes, createDoctorDiagnostic, getDoctorDiagnostics, deleteDoctorDiagnostics } from "../../service/user.service";
import { useTranslation } from "react-i18next";
import xButton from "../../static/images/xButton.png"

interface Diagnostic {
  diagnosticId: number,
  diagnostic: string,
}

interface DoctorDiagnostic{
  examId: number,
  diagnosticId: number,
}

const DeletableBoxItem = ({
  id,
  label,
  onDelete,
}: {
  id: number;
  label: string;
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
          <Grid container
            display={"flex"}
            marginLeft={"1%"}
          >
            <Grid item xs={9} sm={9} md={9} lg={9} display={'flex'} justifyContent={'center'} alignItems={"center"} >
            <Typography fontSize={"65%"} fontWeight={"bold"} align="left">
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

const ParserDiagnostic = (diagnostics: [], listOfDiagnostics: (Diagnostic)[]) => {
  let newDiagnostics: (Diagnostic)[] = [];
  diagnostics.map((item: (number | string)[])=>{
    const text = item[1].toString();
    let newObject: undefined | Diagnostic = listOfDiagnostics.find(object => object.diagnostic == text);
    if (newObject){
      newDiagnostics.push(newObject);
    }
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

  const [diagnosticosSugeridos, setDiagnosticosSugeridos] = useState<(Diagnostic)[]>([]);
  const [doctorDiagnostics, setDoctorDiagnostics] = useState<(DoctorDiagnostic)[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    if(diagnosticTypes.length === 0) return;
    getSuggestedDiagnostic(examId).then(
      (res) => {
        const diagnosticDataParser = ParserDiagnostic(res.data[1], diagnosticTypes);
        setDiagnosticosSugeridos(diagnosticDataParser);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setDiagnosticosSugerido(_content);
        setDiagnosticosSugeridos(_content);
      }
    );
  }, [diagnosticTypes]);

  useEffect(() => {
    getDoctorDiagnostics(examId).then(
      (res) => {
        let newDoctorDiagnostics: DoctorDiagnostic[] = [];
        res.data.map((doctorDiagnostic: { exam_id: any; diagnostic_id: any; }) => {
          newDoctorDiagnostics.push({
            examId: doctorDiagnostic.exam_id,
            diagnosticId: doctorDiagnostic.diagnostic_id,
          });
        });
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
  }, []);  

  const [newItem, setNewItem] = useState<Diagnostic | null>();

  const handleDeleteDiagnosticoSugerido = (item: string): void => {
    setDiagnosticosSugerido(DiagnosticosSugeridos.filter((i) => i?.diagnostic.toString() !== item));
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
      setDoctorDiagnostics([...doctorDiagnostics, {examId: examId, diagnosticId: newItem.diagnosticId}]);
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
        {DiagnosticosSugeridos.length>0 && DiagnosticosSugeridos.map((item: Diagnostic) => (
          <DeletableBoxItem
            key={item.diagnosticId}
            id={item.diagnosticId}
            label={item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
            onDelete={handleDeleteDiagnosticoSugerido}
          />
        ))}
        {doctorDiagnostics.length>0 && doctorDiagnostics.map((item: DoctorDiagnostic) => (
          <DeletableBoxItem
            key={item.diagnosticId}
            id={item.diagnosticId}
            label={item.diagnosticId ? t("diagnostic" + item.diagnosticId.toString()) : ""}
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
