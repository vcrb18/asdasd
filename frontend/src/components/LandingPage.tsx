import React, { useState } from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string, href: string }>;
  tabs?: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (value: number) => {
    setTabIndex(value);
  };

  return (
    <>
      <Header tabs={tabs} buttons={buttons} onTabChange={handleTabChange} />
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <p>Render Component 1</p>}
        {tabIndex === 1 && <p>Render Component 2</p>}
      </Box>
    </>
  );
};

export default LandingPage;
