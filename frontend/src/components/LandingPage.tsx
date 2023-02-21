import React, { useState } from "react";
import Header from "../components/Header";
// import { Box } from "@mui/material";

export interface LandingPageProps {
  buttons: Array<{ label: string; href: string }>;
  tabs?: Array<{ label: string }>;
  // onTabValueChange: (index: number) => void;
  // onHeaderUpdate: () => void;
  // onHeaderUpdate: (index: number) => void;
  // landingPageTabChange: (index: number) => void;
  // onTabChange: (index: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  buttons,
  tabs
}) => {
  const [value, setValue] = useState<number>(0);
  console.log(`El valor incial en LandingPage es ${value}`);
  // const handleOnTabValueChange = (index: number) => {
  //   setValue(index)
  // }
  const handleTabChange = (index: number): void => {
    console.log(`Landing Page 2: Tab index changed to ${index}`);
    setValue(index);
  };
  // const handleOnTabValueChange = (index: number): void => {
  //   console.log("LO LOGRASTE VINI!!!!!!!!!!!!!");
  //   setValue(index);
  // };

  // const [headerUpdated, setHeaderUpdated] = useState<boolean>(false);
  // const handlerHeaderUpdate = () => {
  //   setHeaderUpdated(true);
  //   console.log("Header updateado")
  // }
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

  return (
    <>
      <Header
        buttons={buttons}
        tabs={tabs}
        onTabChange={(index: number) => {
          console.log(`Landing Page 1: Tab index changed to ${index}`);
          handleTabChange(index);
        }}
        //  onTabValueChange={(index: number) => {
        //   console.log(`Landing Page: Tab index changed to ${index}`);
        //   handleOnTabValueChange(index);
        // }}
        // onTabValueChange={(index: number) => { setValue(index) }}
        // onTabValueChange={handleOnTabValueChange}
        // onHeaderUpdate={(index: number) => {
        //   console.log(`LandingPage: Tab index changed to ${index}`);
        // }}
      />
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
