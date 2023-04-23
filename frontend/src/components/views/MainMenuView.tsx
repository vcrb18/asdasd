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
        headerPosition="relative"
        onTabValueChange={(index: number) => {
          console.log(`Main Menu: Tab index changed to ${index}`);
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
        mt={"5%"}
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
              
              {/* <Divider orientation="horizontal" light /> */}
              <Grid item 
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                // display={"flex"}
                // justifyContent={"center"}
                // alignItems={"flex-end"}
                >
                <Typography fontSize={"180%"} color={"#82b8c2"} >
                  {t("home")}
                </Typography>
              </Grid>
          {/* <Typography
            align="center"
            color={"#007088"}
            fontSize={"4rem"}
            sx={{ margin: "auto" }}
            >
            {t("mainMenu")}
          </Typography> */}
        </Grid>
        <Grid container lg={8} md={8} xs={12}>
          <MainMenuButton />
        </Grid>
      </Grid>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default MainMenuView;
