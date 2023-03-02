import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type ButtonProps } from "./Header";
import { useTranslation } from "react-i18next";

interface NavBarButtonProps {
  buttonsLabels: ButtonProps[];
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  buttonsLabels,
}): JSX.Element => {
  const { t } = useTranslation();
  const buttonsTheme = createTheme({
    palette: {
      primary: {
        main: "#006a6b",
      },
    },
  });
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = (event: SelectChangeEvent): void => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error(error);
    });
  };

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
              {t(button.label)}
              {/* {t("login")} */}
              {/* {button.label} */}
            </Button>
          ))
        : null}
      <Select
        value={language}
        onChange={handleLanguageChange}
        size="small"
        sx={{
          marginLeft: "1%",
          backgroundColor: "#006a6b",
          color: "#fff",
          borderRadius: 1,
        }}
      >
        <MenuItem value="es">{t("es")}</MenuItem>
        <MenuItem value="en">{t("en")}</MenuItem>
      </Select>
    </ThemeProvider>
  );
};

export default NavBarButton;
