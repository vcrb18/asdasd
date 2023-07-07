import { MedicalCenter } from "./MedicalCenters";

import { Grid, Typography } from "@mui/material";

interface MedicalCenterListProps {
  medicalCentersList: MedicalCenter[];
}

function MedicalCenterList({medicalCentersList}: MedicalCenterListProps) {
  return (
    <Grid container width={"80%"} margin={"5%"} gap={5} sx={{border: 1,
        borderColor: "#E4EDEF",
        borderRadius: 3,
      }}
      padding={"1%"}>
      {medicalCentersList.map((medicalCenter: MedicalCenter) => {
        return (
          <Grid
            item
            bgcolor={"#E4EDEF"}
            width={"80%"}
            borderRadius={3}
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography color={"#007088"} fontWeight={"bold"}>
              {medicalCenter.legalName}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MedicalCenterList;
