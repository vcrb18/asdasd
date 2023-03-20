import { Fab, Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { mainMenuPageButtons } from "../../utils/routingPropConsts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface MainMenuButtonProps {
  onButtonClick: (index: number) => void;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ onButtonClick }) : JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(4);

  const handleButtonClick = (index: number) => {
    setTabIndex(index);
    onButtonClick(index);
  };

  return (
    <>
      <Grid
        container
        lg={12}
        padding={"5%"}
        spacing={"1%"}
        sx={{
          width: "-webkit-fill-available",
          heigth: "-webkit-fill-available",
        }}
      >
        {mainMenuPageButtons != null && mainMenuPageButtons.length > 0
          ? mainMenuPageButtons.map((button, index) => (
              <Grid item lg={6} md={6} xs={12} key={index}>
                <Item sx={{ backgroundColor: "#c7dff9" }}>
                  <Box display={"flex"} justifyContent={"flex-start"}>
                    <Typography variant="h3" color={"#666666"}>
                      {button.label}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"flex-end"}
                  >
                    <Fab
                      size="small"
                      onClick={() => {handleButtonClick(index)}}
                      sx={{ backgroundColor: "#404040", color: "#c7dff9" }}
                    >
                      <ArrowForwardIcon sx={{ color: "#1c9093" }} />
                    </Fab>
                  </Box>
                </Item>
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default MainMenuButton;
