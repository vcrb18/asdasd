import React from "react";
import PropTypes, { type Validator } from "prop-types";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../../styles/Header.css";
import DrawerComp from "./DrawerComp";
import Logo from "./Logo";
import LogoCompleto from "../../static/images/logo_isatec_completo.png"
import NavBarButton from "./NavBarButton";
import NavbarTabs from "./NavbarTabs";
import App from "../../App";

export interface TabProps {
  label: string;
  href: string;
}

export interface ButtonProps {
  label: string;
  href: string;
}

interface HeaderProps {
  tabs?: TabProps[];
  buttons: ButtonProps[];
  headerPositionXs: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  headerPositionMd: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  headerPositionLg: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  onTabValueChange: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons, headerPositionMd, headerPositionLg, onTabValueChange }) => {
  const theme = useTheme();
  const isMatchMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatchXs = useMediaQuery(theme.breakpoints.down("md"));
  const handleTabChange = (index: number): void => {
    onTabValueChange(index);
  };
  if (!isMatchXs && !isMatchMd){
    return (
      <React.Fragment>
        <AppBar color={'transparent'} position={headerPositionLg} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%" }}>
        <Toolbar>
        {tabs != null && tabs.length > 0 ? (
          <>
            <NavbarTabs
              tabs={tabs}
              onTabChange={(index: number) => {
                handleTabChange(index);
              }}
              />
            <NavBarButton buttonsLabels={buttons} />
          </>
        ) : (
          <NavBarButton buttonsLabels={buttons} />
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
    )
  }
  else if (isMatchMd && !isMatchXs){

  return (
    <React.Fragment>
            <AppBar color={'transparent'} position={headerPositionMd} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%" }}>
              <Toolbar>
              {tabs != null ? (
                <DrawerComp
                  buttons={buttons}
                  tabs={tabs}
                  onTabChange={(index: number) => {
                    handleTabChange(index);
                  }}
                />
                  
              ) : (
                <DrawerComp buttons={buttons} onTabChange={() => {}} />
              )}
              </Toolbar>
            </AppBar>
    </React.Fragment>
  )
  }
  else {
    return (
      <React.Fragment>
              <AppBar color={'transparent'} position={headerPositionMd} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%" }}>
                <Toolbar>
                {tabs != null ? (
                  <DrawerComp
                    buttons={buttons}
                    tabs={tabs}
                    onTabChange={(index: number) => {
                      handleTabChange(index);
                    }}
                  />
                ) : (
                  <DrawerComp buttons={buttons} onTabChange={() => {}} />
                )}
                </Toolbar>
              </AppBar>
      </React.Fragment>
    )
    }
  };

export default Header;

