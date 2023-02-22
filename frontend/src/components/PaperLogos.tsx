import React from "react";
import { Grid, Paper } from "@mui/material";

const PaperLogos: React.FC = () => {
  <Grid
    container
    lg={12}
    rowSpacing={2}
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    padding={5}
    sx={{
      marginTop: "2%",
      // backgroundColor: "#404040",
      width: "-webkit-fill-available",
      heigth: "-webkit-fill-available",
    }}
  >
    <Paper variant="outlined">PAPEL</Paper>
  </Grid>;

  return <div>PaperLogos</div>;
};

export default PaperLogos;
