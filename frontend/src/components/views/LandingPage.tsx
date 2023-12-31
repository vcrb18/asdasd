import React, { useState } from "react";
import Header, { TabProps } from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box } from "@mui/material";
// import { useTranslation } from "react-i18next";
import HomeTab from "../tabs/HomeTab";
import AboutUsTab from "../tabs/AboutUsTab";
import ContactUsTab from "../tabs/ContactUsTab";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: TabProps[];
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
        headerPositionLg="relative"
        headerPositionMd="relative"
        headerPositionXs="sticky"
        onTabValueChange={(index: number) => {
          handleOnTabValueChange(index);
        }}
      />

      <Box sx={{ padding: 2, maxWidth: "60%" }}>
        {tabIndex === 0 && <HomeTab />}
        {tabIndex === 1 && <AboutUsTab />}
        {tabIndex === 2 && <ContactUsTab />}
      </Box>
      <Footer
       footerPositionLg="static"
       footerPositionMd="static"
       footerPositionXs="static"/>
    </>
  );
};

export default LandingPage;
