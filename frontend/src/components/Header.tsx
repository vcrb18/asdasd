import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../styles/Header.css";
import DrawerComp from "../components/DrawerComp";
import Logo from "../components/Logo";
import NavBarButton from "./NavBarButton";
import NavbarTabs from "./NavbarTabs";

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
  // onTabChange: (value: number) => void;
  onHeaderUpdate?: () => void;
  // landingPageTabChange: (index: number) => void;
  // onTabChange: (event: React.SyntheticEvent, newIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons, onHeaderUpdate }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // Falta mandar el valor del index
    console.log('Entramos al useEffect de Header')
    console.log("onHeaderUpdate")
    console.log(onHeaderUpdate)
    if (onHeaderUpdate) {
      console.log("Entramos al if del useEffect");
      
      onHeaderUpdate();
    }
  }, [tabIndex])

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
                  <NavbarTabs
                    tabs={tabs}
                    onTabChange={(index: number) => {
                      console.log(`Header: Tab index changed to ${index}`);
                      setTabIndex(index)
                    }}
                  />
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
