import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { type TabProps } from "./Header";
import { useTranslation } from "react-i18next";

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
    console.log(`NavbarTabs: Tab index changed to ${newIndex}`);
    setTabIndex(newIndex);
    onTabChange(newIndex);
  };

  return (
    <Tabs
      sx={{ marginLeft: "auto" }}
      textColor="inherit"
      className="tabs-text"
      value={tabIndex}
      onChange={handleTabChange}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={t(tab.label)} />
      ))}
    </Tabs>
  );
};

export default NavbarTabs;
