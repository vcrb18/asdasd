import React, { useState } from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
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

      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <p>Render Component 1</p>}
        {tabIndex === 1 && <p>Render Component 2</p>}
        {tabIndex === 2 && <p>Render Component 3</p>}
      </Box>
    </>
  );
};

export default LandingPage;
