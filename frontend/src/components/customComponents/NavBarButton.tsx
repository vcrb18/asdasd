import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { type ButtonProps } from "./Header";
import { useTranslation } from "react-i18next";
import { logout } from "../../service/auth.service";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { customButtonTheme } from "../../utils/ButtonsConst";

interface NavBarButtonProps {
  buttonsLabels: ButtonProps[];
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  buttonsLabels,
}): JSX.Element => {
  const { t } = useTranslation();
  const buttonsTheme = customButtonTheme;
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const navigate: NavigateFunction = useNavigate();

  const handleLanguageChange = (event: SelectChangeEvent): void => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error(error);
    });
    localStorage.setItem("language", i18n.language);
    document.documentElement.lang = i18n.language
    window.location.reload()
  };

  const handleLogOutClick = (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
    label: string,
    href: string
  ): void => {
    event.preventDefault();

    if (label === "logOut") {
      logout().then(() => {
      navigate("/");
      window.location.reload();
      }).catch((error) => {
        console.error(error)
        navigate("/")
      })
    } else {
      navigate(href);
    }
  };

  return (
    <ThemeProvider theme={buttonsTheme}>
      {buttonsLabels.map((button, index) => (
            <Button
              key={index}
              href={button.href}
              sx={{
                backgroundColor: '#007088',
                color: "#fff",
                width: "154px", // Set a fixed width for the button
                marginLeft: index === 0 ? "auto" : "1%", // Use shorthand notation for marginLeft
              }}
              variant="contained"
              fullWidth
              onClick={(event) => {
                handleLogOutClick(event, button.label, button.href);
              }}
            >
            <Typography color="#fff">
              {t(button.label)}
            </Typography>
            </Button>
          ))}
      <Select
        value={language}
        onChange={handleLanguageChange}
        size="small"
        sx={{
          width: "154px",
          marginLeft: "1%",
          backgroundColor: "#007088",
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
