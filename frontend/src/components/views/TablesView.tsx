import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import {Box, Typography } from "@mui/material";
import { mainMenuHeaderButtons, mainMenuPageButtons } from "../../utils/routingPropConsts";
import AlertsTab from "../tabs/AlertsTab";
import MetricTabs from "../tabs/MetricTab";
import ExamsTab from "../tabs/ExamsTab";

const TablesView: React.FC<{ index: number }> = ({ index }) : JSX.Element => {
  const [tabIndex, setTabIndex] = useState<number>(index);

  const handleOnTabValueChange = (index: number): void => {
    setTabIndex(index);
  };

  return (
    <>
      <Header
        buttons={mainMenuHeaderButtons}
        tabs={mainMenuPageButtons}
        onTabValueChange={(index: number) => {
          console.log(`Main Menu: Tab index changed to ${index}`);
          handleOnTabValueChange(index);
        }}
      />
      <Box sx={{width: "-webkit-fill-available"}}>
        {tabIndex === 0 && (
            <ExamsTab/>
            )}
        {tabIndex === 1 && (
            <MetricTabs/>
            )}
        {tabIndex === 2 && (
            <AlertsTab/>
            )}
        {tabIndex === 3 && (
            <>
            <Typography> Aqui debe ir algo que no se que es</Typography>
            </>
          )}      
        </Box>
      <Footer footerPosition={"fixed"} />
    </>
  );
};

export default TablesView;
