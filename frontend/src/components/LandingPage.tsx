import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
  onHeaderUpdate: () => void;
  // landingPageTabChange: (index: number) => void;
  // onTabChange: (index: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons, tabs }) => {
  const [headerUpdated, setHeaderUpdated] = useState<boolean>(false);
  const handlerHeaderUpdate = () => {
    setHeaderUpdated(true);
    console.log("Header updateado")
  }
  // const [tabIndex, setTabIndex] = useState(0);

  // const handleTabChange = (
  //   event: React.SyntheticEvent,
  //   newIndex: number
  // ): void => {
  //   console.log(`LandingPage: handleTabChange called with newIndex: ${newIndex}`);
  //   setTabIndex(newIndex);
  //   console.log(`LandingPage: tabIndex after setTabIndex: ${tabIndex}`);
  //   onTabChange(newIndex);
  // };

  
  // useEffect(() => {
  //   console.log(`TAB INDEX CHANGED TO ${tabIndex}`)
  // }, [tabIndex])

  return (
    <>
      <Header tabs={tabs} buttons={buttons} onHeaderUpdate={handlerHeaderUpdate}  />
      {/* <Header tabs={tabs} buttons={buttons} onTabChange={handleTabChange} /> */}
      {/* <Header tabs={tabs} buttons={buttons} onTabChange={(index: number) => {
                      console.log(`Landing Page: Tab index changed to ${index}`);
                    }} /> */}

      {/* <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <p>Render Component 1</p>}
        {tabIndex === 1 && <p>Render Component 2</p>}
      </Box> */}
    </>
  );
};

export default LandingPage;
