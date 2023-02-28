import React, { useState } from "react";
import Header from "../customComponents/Header";
import Footer from "../customComponents/Footer";
import { Box} from "@mui/material";
// import { useTranslation } from "react-i18next";
import HomeTab from '../tabs/HomeTab';
import AboutUsTab from "../tabs/AboutUsTab";
import ContactUsTab from "../tabs/ContactUsTab";

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
          <HomeTab/>
        )}
        {tabIndex === 1 && (
          <AboutUsTab/>
        )}
        {tabIndex === 2 && (
          <ContactUsTab/>
        )}
      </Box>
      <Footer footerPosition={"static"} />
    </>
  );
};

export default LandingPage;
