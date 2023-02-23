import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { type ButtonProps } from "./Header";

interface NavBarButtonProps {
  buttonsLabels: ButtonProps[];
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ buttonsLabels }) => {
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#006a6b",
      },
    },
  });
  return (
    <ThemeProvider theme={buttonsTheme}>
      {buttonsLabels != null && buttonsLabels.length > 0
        ? buttonsLabels.map((button, index) => (
            <Button
              color="primary"
              key={index}
              href={button.href}
              sx={index === 0 ? { marginLeft: "auto" } : { marginLeft: "1%" }}
              variant="contained"
            >
              {button.label}
            </Button>
          ))
        : null}
    </ThemeProvider>
  );
};

export default NavBarButton;
