/*eslint-disable*/
import React from "react";
import PropTypes, { type Validator } from "prop-types";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../../styles/Header.css";
import DrawerComp from "./DrawerComp";
import Logo from "../../static/images/logo_isatec_sin_subtitulo.png"
import NavBarButton from "./NavBarButton";
import NavbarTabs from "./NavbarTabs";
import App from "../../App";
import {Link} from "react-router-dom";


export interface TabProps {
  label: string;
  href: string;
  target: string;
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
        <AppBar color={'primary'} position={headerPositionLg} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%", top: "0" }}>
        <Toolbar>
        {tabs != null && tabs.length > 0 ? (
          <>
            <Link to={"/mainmenu"} style={{display: "flex", alignItems: "initial", width: "35%"}}>
            <img src={Logo} width={"35%"}/>
            </Link>
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
            <AppBar color={'primary'} position={headerPositionMd} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%", top: "0" }}>
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
              <AppBar color={'primary'} position={headerPositionMd} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%", top: "0" }}>
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

