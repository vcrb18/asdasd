import { Fab, Box, Typography, Grid, Paper, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { MouseEventHandler, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { mainMenuPageButtons } from "../../utils/routingPropConsts";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MainMenuButton = (): JSX.Element => {
  const { t } = useTranslation();

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
              <Grid container lg={6} md={6} xs={12} key={index} padding={'0.5%'}>
                <Button sx={{ backgroundColor: "#E4EDEF" }} href={button.href}                fullWidth >
                  <Grid 
                    container
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"space-arround"}
                    sx={{
                    width: "-webkit-fill-available",
                    heigth: "-webkit-fill-available",
                    }}
                  >
                    <Grid item lg={12} md={12} xs={12} 
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginTop={'2%'}>
                      <Avatar>

                      </Avatar>
                    </Grid>
                    <Grid item marginY={'2%'}>
                      <Typography
                      fontSize={"250%"}
                      color={"#007088"}
                    >
                    {t(button.label)}
                    </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default MainMenuButton;
