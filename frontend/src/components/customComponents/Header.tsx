import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../../styles/Header.css";
import DrawerComp from "./DrawerComp";
import Logo from "./Logo";
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
  onTabValueChange: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons, onTabValueChange }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleTabChange = (index: number): void => {
    onTabValueChange(index);
  };

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
                      console.log(`Header 1: Tab index changed to ${index}`);
                      handleTabChange(index);
                    }}
                  />
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
