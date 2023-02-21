import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import "../styles/Header.css";
import DrawerComp from "../components/DrawerComp";
import Logo from "../components/Logo";
import NavBarButton from "./NavBarButton";
// import NavbarTabs from "./NavbarTabs";

export interface TabProps {
  label: string;
}

export interface ButtonProps {
  label: string;
  href: string;
}

interface HeaderProps {
  tabs?: TabProps[];
  buttons: ButtonProps[];
  onTabChange: (index: number) => void;
  // onTabChange: (value: number) => void;
  // onHeaderUpdate?: () => void;

  // landingPageTabChange: (index: number) => void;
  // onTabChange: (event: React.SyntheticEvent, newIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons, onTabChange }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleTabChange = (
    event: React.SyntheticEvent,
    newIndex: number
  ): void => {
    console.log(`Header: Tab index changed to ${newIndex}`);
    setTabIndex(newIndex);
    onTabChange(newIndex);
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const handleTabChange = (index: number): void => {
  //   console.log(`Header 2: Tab index changed to ${index}`);
  //   onTabValueChange(index);
  // };

  // useEffect(() => {
  //   // Falta mandar el valor del index
  //   console.log('Entramos al useEffect de Header')
  //   console.log("onHeaderUpdate")
  //   console.log(onHeaderUpdate)
  //   if (onHeaderUpdate) {
  //     console.log("Entramos al if del useEffect");

  //     onHeaderUpdate();
  //   }
  // }, [tabIndex])

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#1c9093" }}>
        <Toolbar>
          <Logo />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                ISATEC HEART
              </Typography>
              <DrawerComp buttons={buttons} />
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                ISATEC HEART
              </Typography>
              {tabs != null && tabs.length > 0 ? (
                <>
                  <Tabs
                    sx={{ marginLeft: "auto" }}
                    textColor="inherit"
                    className="tabs-text"
                    value={tabIndex}
                    onChange={handleTabChange}
                  >
                    {tabs.map((tab, index) => (
                      <Tab key={index} label={tab.label} />
                    ))}
                  </Tabs>

                  {/* <NavbarTabs
                    tabs={tabs}
                    // onTabChange={onTabValueChange}
                    onTabChange={(index: number) => {
                      console.log(`Header 1: Tab index changed to ${index}`);
                      handleTabChange(index);
                    }}
                  /> */}
                  {/* <NavbarTabs tabs={tabs} onTabChange={onTabChange} /> */}
                  <NavBarButton buttonsLabels={buttons} />
                </>
              ) : (
                <NavBarButton buttonsLabels={buttons} />
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
