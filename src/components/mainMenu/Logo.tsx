import { Grid, Typography } from "@mui/material";
import logo from "@/assets/images/logo_isatec_completo.png"

function MainMenuLogo (){
  return(
    <Grid 
    container
    lg={4} md={4} xs={12}
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    >
      <Grid 
      item 
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      >
        <img src={logo} width={"75%"}/>
      </Grid>
      <Grid 
      item 
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      >
        <Typography 
        fontSize={"180%"} 
        color={"#82b8c2"} 
        >
          Home
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MainMenuLogo;