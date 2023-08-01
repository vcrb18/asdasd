import { MedicalCenter } from "./MedicalCenters";

import { Avatar, Button, Grid, Typography } from "@mui/material";

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

  const medicalCenterBoxStyle = {
    bgcolor: "#fff",
    border: 1,
    borderColor: "#007088",
    width:"80%",
    paddingLeft: "1%",
    maxHeight: 100,
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
  return (
    <Grid
      container
      margin={"2%"}
      gap={3}
      sx={{ border: 1, borderColor: "#E4EDEF", borderRadius: 3 , bgcolor: "#fff", height: 300, overflowY: 'auto', overflowX:'hidden'}}
      padding={"1%"}
      display={"flex"}
      justifyContent={"center"}
    >
      {activeMedicalCenters.map(
        (medicalCenter: MedicalCenter, index: number) => {
          return (
            <Grid
              key={index}
              item
              lg={3}
              md={3}
              sm={6}
              xs={6}
              sx={medicalCenterBoxStyle}
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
              lg={3}
              md={3}
              sm={6}
              xs={6}
              sx={medicalCenterBoxStyle}
            >
              <Typography color={"#007088"} fontWeight={"bold"}>
                {medicalCenter.legalName}
              </Typography>
              <Button
                onClick={() =>
                  handleDeleteClick(medicalCenter.organizationId)
                }
              >
                <Avatar
                  src={xButton}
                  alt={"checkVerde"}
                  variant={"circular"}
                />
              </Button>
            </Grid>
          );
        }
      )}
    </Grid>
  );
}

export default MedicalCenterList;
