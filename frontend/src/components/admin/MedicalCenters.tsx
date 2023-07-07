import { Box, Grid } from "@mui/material";

import AdminBox from "./AdminBox";
import MedicalCenterSearch from "./MedicalCenterSearch";

import MedicalCenterList from "./MedicalCenterList";

export interface AdminBoxProps {
  text: string;
}

export interface MedicalCenter {
  organizationId: number;
  taxId: string;
  dv: string;
  commercialName: string;
  legalName: string;
  code: string;
  abbreviation: string;
  status: boolean;
  accessType: number;
  ip: string;
  expirationTime: number;
  email: string;
  associate: number;
  executiveId: number;
  address: string;
  phone: string;
  responseTime: number;
  deleted: boolean;
  group: string;
}

interface MedicalCenterProps {
  actualMedicalCenters: MedicalCenter[];
  onNewMedicalCenter: (medicalCenter: MedicalCenter) => void;
}

function MedicalCenters({
  actualMedicalCenters,
  onNewMedicalCenter,
}: MedicalCenterProps) {
  return (
    <Box display={"flex"} width={"100%"} marginTop={"1%"} justifyContent={"center"}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        width={"80%"}
      >
        <AdminBox text="medicalCenter" />
        <MedicalCenterSearch onNewMedicalCenter={onNewMedicalCenter} />
        <MedicalCenterList medicalCentersList={actualMedicalCenters} />
      </Grid>
    </Box>
  );
}

export default MedicalCenters;
