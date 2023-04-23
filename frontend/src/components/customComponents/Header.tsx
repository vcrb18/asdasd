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
  headerPosition: "static" | "fixed" | "relative";
  onTabValueChange: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons,headerPosition , onTabValueChange }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const handleTabChange = (index: number): void => {
    onTabValueChange(index);
  };

  return (
    <React.Fragment>
      <AppBar color={'transparent'} position={"relative"} elevation={0} sx={{ background: "#fff", height: "auto", width: "100%" }}>
        <Toolbar>
          {isMatch ? (
            <>
              {/* <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                ISATEC Heart
              </Typography> */}
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
            </>
          ) : (
            <>
              {/* <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                ISATEC Heart
              </Typography> */}
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
                <>
                <NavBarButton buttonsLabels={buttons} />
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;

Header.propTypes = {
  headerPosition: PropTypes.oneOf(["static", "fixed", "relative"]) as Validator<
    "fixed" | "static" | "relative"
  >,
};