import {
  Grid,
  TextField,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Autocomplete,
  DialogActions,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { getMedicalCenters } from "../../service/user.service";

import { MedicalCenter } from "./MedicalCenters";

interface MedicalCenterSearchProps {
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  onSelectAllCenters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  areAllMedicalCentersSelected: boolean;
  areMedicalCentersActive: boolean;
}

function MedicalCenterSearch({
  onNewMedicalCenter,
  onSelectAllCenters,
  areAllMedicalCentersSelected,
  areMedicalCentersActive,
}: MedicalCenterSearchProps) {
  const { t } = useTranslation();
  const [medicalCentersForAI, setMedicalCentersForAI] = useState<
    MedicalCenter[]
  >([]);
  const [openAddMedicalCenter, setOpenAddMedicalCenter] = useState(false);
  const [medicalCenterToAdd, setMedicalCenterToAdd] = useState<MedicalCenter>();


  useEffect(() => {
    const allMedicalCenters = getMedicalCenters().then(
      (medicalCenters) => medicalCenters.data
    );
    allMedicalCenters.then((res) => setMedicalCentersForAI(res));
  }, []);

  const handleAddMedicalCenter = (): void => {
    if (areMedicalCentersActive) {
      alert(t("deactivateAIFirst"));
    } else {
      setOpenAddMedicalCenter(true);
    }
  };

  const handleCloseMedicalCenter = (): void => {
    setOpenAddMedicalCenter(false);
  };

  const handleMedicalCenterSubmit = (): void => {
    if (medicalCenterToAdd) {
      onNewMedicalCenter(medicalCenterToAdd);
      setOpenAddMedicalCenter(false);
    }
  };
  const handleMedicalCenterSelect = (
    event: any,
    newMedicalCenter: MedicalCenter | null
  ) => {
    setMedicalCenterToAdd(newMedicalCenter as MedicalCenter);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAllCenters(event);
  };

  return (
    <Grid
      item
      lg={8}
      md={8}
      sm={8}
      xs={8}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Grid
        item
        lg={6}
        md={6}
        sm={6}
        xs={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography>{t("centerSeleccion")}</Typography>
        <IconButton size="large" edge={"end"} onClick={handleAddMedicalCenter}>
          <AddIcon fontSize={"inherit"} sx={{ color: "#007088" }} />
        </IconButton>
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        sm={6}
        xs={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FormGroup>
          <FormControlLabel
            labelPlacement="start"
            label={<Typography>{t("selectAll")}</Typography>}
            control={
              <Checkbox
                onChange={handleCheckBoxChange}
                checked={areAllMedicalCentersSelected}
              />
            }
          />
        </FormGroup>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openAddMedicalCenter}
        onClose={handleCloseMedicalCenter}
      >
        <DialogTitle>
          {t("add")} {t("medicalCenter")}
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            getOptionLabel={(option) => option.legalName}
            options={medicalCentersForAI}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="" />}
            onChange={handleMedicalCenterSelect}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMedicalCenter}>{t("cancel")}</Button>
          <Button
            onClick={handleMedicalCenterSubmit}
            variant="contained"
            color="error"
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MedicalCenterSearch;
