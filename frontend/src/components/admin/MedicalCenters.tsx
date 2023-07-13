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
  actualMedicalCenters: MedicalCenter[];
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
  timeActiveLeft: number[];
  areMedicalCentersActive: boolean;
}

function MedicalCenters({
  actualMedicalCenters,
  onNewMedicalCenter,
  timeActiveLeft,
  areMedicalCentersActive,
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
          areMedicalCentersActive={areMedicalCentersActive}
        />
        <MedicalCenterList
          medicalCentersList={actualMedicalCenters}
          timeActiveLeft={timeActiveLeft}
        />
      </Grid>
    </Box>
  );
}

export default MedicalCenters;
