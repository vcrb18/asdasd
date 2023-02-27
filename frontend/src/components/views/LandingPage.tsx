import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
import HomeTab from '../customComponents/HomeTab';

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  // const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOnTabValueChange = (index: number): void => {
    setTabIndex(index);
  };

  return (
    <>
      <Header
        buttons={buttons}
        tabs={tabs}
        onTabValueChange={(index: number) => {
          console.log(`Landing Page: Tab index changed to ${index}`);
          handleOnTabValueChange(index);
        }}
      />

      <Box sx={{ padding: 2, maxWidth: "60%" }}>
        {tabIndex === 0 && (
             <HomeTab/>)}
        {tabIndex === 1 && (
          <Box>
            <Typography mt={20} sx={{ fontSize: "4rem", color: "#404040" }}>
              Aqui debemos ver que vamos a escribir (o hacer una vista de esto)
            </Typography>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography mt={20} sx={{ fontSize: "4rem", color: "#404040" }}>
            Aqui debemos ver que vamos a escribir (o hacer una vista de esto)
            </Typography>
          </Box>
        )}
      </Box>
      <Footer footerPosition={"static"} />
    </>
  );
};

export default LandingPage;
