import { MedicalCenter } from "./MedicalCenters";

import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";

interface MedicalCenterListProps {
  medicalCentersList: MedicalCenter[];
  timeActiveLeft: number[];
}

function MedicalCenterList({
  medicalCentersList,
  timeActiveLeft,
}: MedicalCenterListProps) {
  return (
    <Grid
      container
      width={"80%"}
      margin={"5%"}
      gap={5}
      sx={{ border: 1, borderColor: "#E4EDEF", borderRadius: 3 }}
      padding={"1%"}
    >
      {medicalCentersList.map((medicalCenter: MedicalCenter, index: number) => {
        return (
          <Grid
            key={index}
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
            <Typography marginX={"5%"}>
              <span>{timeActiveLeft[0]}</span>:<span>{timeActiveLeft[1]}</span>
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MedicalCenterList;
