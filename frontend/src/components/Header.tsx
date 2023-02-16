import React from "react";
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

interface TabProps {
  label: string;
}

export interface ButtonProps {
  label: string;
}

interface HeaderProps {
  tabs?: TabProps[];
  buttons: ButtonProps[];
}

const Header: React.FC<HeaderProps> = ({ tabs, buttons }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#1c9093" }}>
        <Toolbar>
          <Logo />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                Análisis de electrocardiogramas con IA
              </Typography>
              <DrawerComp buttons={buttons} />
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: "1.2rem" }} className="ecg-title">
                Análisis de electrocardiogramas con IA
              </Typography>
              <NavBarButton buttonsLabels={buttons} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
