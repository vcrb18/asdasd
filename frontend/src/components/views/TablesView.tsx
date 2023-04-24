import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography } from "@mui/material";
import {
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "../../utils/routingPropConsts";
import AlertsTab from "../tabs/AlertsTab";
import MetricTabs from "../tabs/MetricTab";
import ExamsTab from "../tabs/ExamsTab";
import MainMenuView from "./MainMenuView";

const TablesView: React.FC = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number>(4);

  const handleButtonClicked = (index: number): void => {
    setSelectedIndex(index);
  };

  return (
    <>
      {selectedIndex === 4 && <MainMenuView />}
      {selectedIndex !== 4 && (
        <>
          <Header
            buttons={mainMenuHeaderButtons}
            tabs={mainMenuPageButtons}
            headerPositionLg="relative"
            headerPositionMd="sticky"
            onTabValueChange={(index: number) => {
              handleButtonClicked(index);
            }}
          />
          <Box sx={{ width: "-webkit-fill-available" }}>
            {selectedIndex === 0 && <ExamsTab />}
            {selectedIndex === 1 && <MetricTabs />}
            {selectedIndex === 2 && <AlertsTab />}
            {selectedIndex === 3 && (
              <>
                <Typography> Aqui debe ir algo que no se que es</Typography>
              </>
            )}
          </Box>
          <Footer footerPositionLg={"fixed"} footerPositionMd="relative" footerPositionXs="relative" />
        </>
      )}
    </>
  );
};

export default TablesView;
