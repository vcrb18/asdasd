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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { getMedicalCenters } from "../../service/user.service";

import { MedicalCenter } from "./MedicalCenters";

interface MedicalCenterSearchProps {
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  areMedicalCentersActive: boolean;
}

function MedicalCenterSearch({
  onNewMedicalCenter,
  areMedicalCentersActive,
}: MedicalCenterSearchProps) {
  const { t } = useTranslation();
  const [medicalCentersForAI, setMedicalCentersForAI] = useState<
    MedicalCenter[]
  >([]);
  const [openAddMedicalCenter, setOpenAddMedicalCenter] = useState(false);
  const [medicalCenterToAdd, setMedicalCenterToAdd] = useState<MedicalCenter>();

  const allMedicalCenters = getMedicalCenters().then(
    (medicalCenters) => medicalCenters.data
  );

  useEffect(() => {
    allMedicalCenters.then((res) => setMedicalCentersForAI(res));
  }, []);

  const handleAddMedicalCenter = (): void => {
    if (areMedicalCentersActive) {
      alert("Desactive la IA primero");
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

  return (
    <Grid
      item
      lg={4}
      md={4}
      sm={12}
      xs={12}
      display={"flex"}
      justifyContent={"center"}
    >
      <IconButton size="large" edge={"end"} onClick={handleAddMedicalCenter}>
        <AddIcon fontSize={"inherit"} sx={{ color: "#007088" }} />
      </IconButton>
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
