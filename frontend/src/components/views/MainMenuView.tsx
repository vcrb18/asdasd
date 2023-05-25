import React from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Grid, Typography } from "@mui/material";
import {
  mainMenuHeaderButtons,
  mainMenuTabs,
} from "../../utils/routingPropConsts";
import LogoCompleto from "../../static/images/logo_isatec_completo.png"
import { useTranslation } from "react-i18next";
import MainMenuButton from "../customComponents/MainMenuButton";

const MainMenuView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        buttons={mainMenuHeaderButtons}
        headerPositionLg="absolute"
        headerPositionMd="relative"
        headerPositionXs="fixed"
        onTabValueChange={(index: number) => {
        }}
      />
      <Grid 
        container
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
        }}
        margin={"auto"}
        minHeight={"100vh"}
        lg={12}
        md={12}
        xs={12}
      >
        <Grid 
              container
              lg={4} md={4} xs={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              >
              <Grid item 
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                >
                <img src={LogoCompleto} width={"75%"}/>
              </Grid>
              <Grid item 
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                >
                <Typography fontSize={"180%"} color={"#82b8c2"} >
                  {t("home")}
                </Typography>
              </Grid>
        </Grid>
        <Grid container lg={8} md={8} xs={12}>
          <MainMenuButton />
        </Grid>
      </Grid>
      <Footer
        footerPositionLg="absolute"
        footerPositionMd="absolute" 
        footerPositionXs="relative" />
    </>
  );
};

export default MainMenuView;
