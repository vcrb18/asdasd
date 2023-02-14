import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, useTheme } from "@mui/material";

interface ButtonProps {
    label: string;
}

interface NavBarButtonProps {
  buttonsLabels: ButtonProps[];
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ buttonsLabels }) => {
  const theme = useTheme();
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#4d4d4d",
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
              sx={
                index === 0
                  ? { marginLeft: "auto" }
                  : index === 1
                  ? { marginLeft: "1%" }
                  : {}
              }
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
