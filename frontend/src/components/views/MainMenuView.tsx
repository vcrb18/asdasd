import React from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography } from "@mui/material";
import {
  mainMenuHeaderButtons,
  mainMenuTabs,
} from "../../utils/routingPropConsts";
import { useTranslation } from "react-i18next";
import MainMenuButton from "../customComponents/MainMenuButton";

const MainMenuView = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        tabs={mainMenuTabs}
        buttons={mainMenuHeaderButtons}
        onTabValueChange={(index: number) => {
          console.log(`Main Menu: Tab index changed to ${index}`);
        }}
      />
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        paddingLeft={"2%"}
        sx={{
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
        }}
        mt={"5%"}
      >
        <Typography color={"#404040"} fontSize={"4rem"}>
          {t("mainMenu")}
        </Typography>
      </Box>
        <MainMenuButton />
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default MainMenuView;
