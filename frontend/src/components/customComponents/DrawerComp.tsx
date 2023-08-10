import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  type SelectChangeEvent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { logout } from "../../service/auth.service";
import { type NavigateFunction, useNavigate } from "react-router-dom";
interface DrawerTabItems {
  label: string;
  href: string;
}

interface DrawerButtonItems {
  label: string;
  href: string;
}

interface DrawerCompProps {
  tabs?: DrawerTabItems[];
  buttons: DrawerButtonItems[];
  onTabChange: (index: number) => void;
}

const DrawerComp: React.FC<DrawerCompProps> = (props) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const [openDrawer, setOpenDrawer] = useState(false);
  const tabsAndButtons = [...(props.tabs || []), ...props.buttons];
  const onTabChange = (index: number): void => {
    props.onTabChange(index);
  };
  const { t } = useTranslation();
  // const tabsAndButtons = [...(props.tabs || []), ...props.buttons];
  const navigate: NavigateFunction = useNavigate();

  const handleLanguageChange = (event: SelectChangeEvent): void => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error(error);
    });
    localStorage.setItem("language", i18n.language)
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
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Select
          value={language}
          onChange={handleLanguageChange}
          size="small"
          sx={{
            width: "154px",
            marginLeft: "1%",
            color: "#00000089",
          }}
        >
          <MenuItem value="es">{t("es")}</MenuItem>
          <MenuItem value="en">{t("en")}</MenuItem>
        </Select>
        <List>
          {tabsAndButtons.map((tabOrButton, index) => (
            <ListItemButton
              href={tabOrButton.href}
              onClick={(event) => {
                if (props.tabs?.length && index < props.tabs.length) {
                  onTabChange(index);
                }
                setOpenDrawer(false)
                handleLogOutClick(event,tabOrButton.label,tabOrButton.href);
              }}
              key={index}
            >
              <ListItemIcon>
                <ListItemText>{t(tabOrButton.label)}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "#e0e0e0", marginLeft: "auto" }}
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <MenuIcon sx={{ marginLeft: "auto", color: '#000'}} />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
