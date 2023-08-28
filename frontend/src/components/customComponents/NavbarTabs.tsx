import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { type TabProps } from "./Header";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/joy";

interface NavbarTabsProps {
  tabs: TabProps[];
  onTabChange: (index: number) => void;
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ tabs, onTabChange }) => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newIndex: number
  ): void => {
    setTabIndex(newIndex);
    onTabChange(newIndex);
  };

  return (
    <Box>
      <Tabs
        sx={{ marginLeft: "auto" }}
        textColor="inherit"
        className="tabs-text"
        value={tabIndex}
        onChange={handleTabChange}
      >
        {tabs.map((tab, index) => (
          <Box display={'flex'} justifyContent={'center'} alignItems={'flex-end'}>
          <Tab
            key={index}
            href={tab.href}
            target={tab.target}
            label={
                <Typography sx={{color: "#007088"}}>
                  {t(tab.label)}
                </Typography>
            }
            disabled={tab.label === "aboutUs" || tab.label === "metrics" || tab.label === "alerts"
             || tab.label === "report"
             || tab.label === "contactUs"}
            />
          </Box>
        ))}
      </Tabs>
    </Box>

  );
};

export default NavbarTabs;
