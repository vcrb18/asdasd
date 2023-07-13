import { MedicalCenter } from "./MedicalCenters";

import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

import xButton from "../../static/images/xButton.png";

interface MedicalCenterListProps {
  activeMedicalCenters: MedicalCenter[];
  medicalCentersToAdd: MedicalCenter[];
  timeActiveLeft: number[];
  handleDeleteClick: (id: number) => void;
}

function MedicalCenterList({
  activeMedicalCenters,
  medicalCentersToAdd,
  timeActiveLeft,
  handleDeleteClick,
}: MedicalCenterListProps) {
  return (
    <Grid
      container
      width={"80%"}
      margin={"5%"}
      gap={2}
      sx={{ border: 1, borderColor: "#E4EDEF", borderRadius: 3 }}
      padding={"1%"}
    >
      {activeMedicalCenters.map(
        (medicalCenter: MedicalCenter, index: number) => {
          return (
            <Grid
              key={index}
              item
              bgcolor={"#E4EDEF"}
              width={"80%"}
              borderRadius={3}
              lg={3}
              md={3}
              sm={12}
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography color={"#007088"} fontWeight={"bold"}>
                {medicalCenter.legalName}
              </Typography>
              <Typography marginX={"5%"}>
                <span>{timeActiveLeft[0]}</span>:
                <span>{timeActiveLeft[1]}</span>
              </Typography>
            </Grid>
          );
        }
      )}
      {medicalCentersToAdd.map(
        (medicalCenter: MedicalCenter, index: number) => {
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
              <Button
                onClick={() => handleDeleteClick(medicalCenter.organizationId)}
              >
                <Avatar src={xButton} alt={"checkVerde"} variant={"circular"} />
              </Button>
            </Grid>
          );
        }
      )}
    </Grid>
  );
}

export default MedicalCenterList;
