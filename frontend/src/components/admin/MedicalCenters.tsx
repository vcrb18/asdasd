import { Box, Grid } from "@mui/material";

import AdminBox from "./AdminBox";
import MedicalCenterSearch from "./MedicalCenterSearch";

import MedicalCenterList from "./MedicalCenterList";
import { isEmptyArray } from "formik";

export interface MedicalCenter {
  organizationId: number;
  legalName: string;
}

interface MedicalCenterProps {
  activeMedicalCenters: MedicalCenter[];
  medicalCentersToAdd: MedicalCenter[];
  timeActiveLeft: number[];
  areMedicalCentersActive: boolean;
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  onSelectAllCenters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteClick: (id: number) => void;
  areAllMedicalCentersSelected: boolean;
  areAllMedicalCentersActived: boolean;
}

function MedicalCenters({
  activeMedicalCenters,
  medicalCentersToAdd,
  timeActiveLeft,
  areMedicalCentersActive,
  onNewMedicalCenter,
  onSelectAllCenters,
  handleDeleteClick,
  areAllMedicalCentersSelected,
  areAllMedicalCentersActived,
}: MedicalCenterProps) {
  return (
    <Box
      display={"flex"}
      width={"100%"}
      marginTop={"1%"}
      justifyContent={"center"}
    >
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        width={"80%"}
      >
        <AdminBox text="medicalCenter" />
        <MedicalCenterSearch
          onNewMedicalCenter={onNewMedicalCenter}
          onSelectAllCenters={onSelectAllCenters}
          areAllMedicalCentersSelected={areAllMedicalCentersSelected}
          areMedicalCentersActive={areMedicalCentersActive}
        />
        <MedicalCenterList
          activeMedicalCenters={activeMedicalCenters}
          medicalCentersToAdd={medicalCentersToAdd}
          timeActiveLeft={timeActiveLeft}
          handleDeleteClick={handleDeleteClick}
          areAllMedicalCentersSelected={areAllMedicalCentersSelected}
          areAllMedicalCentersActived={areAllMedicalCentersActived}
        />
      </Grid>
    </Box>
  );
}

export default MedicalCenters;
