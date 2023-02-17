import React, { useState } from "react";
import Header from "../components/Header";
import Logo from "./Logo";
import { Box, Typography } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs: Array<{ label: string; }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  const tabIndex = 0;
  console.log("tabIndex");
  console.log(tabIndex);

  
  // const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setTabIndex(newValue);
  // };

  return (
    <>
      {/* No le estaba pasando los tabs y igual los estaba mostrando. WTF */}
      <Header tabs={tabs} buttons={buttons} />;
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography>The first tab</Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography>The second tab</Typography>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography>The third tab</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LandingPage;
