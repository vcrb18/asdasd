import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { type TabProps } from "./Header";
import { useTranslation } from "react-i18next";
import { log } from "console";

interface NavbarTabsProps {
  tabs: TabProps[];
  onTabChange: (index: number) => void;
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ tabs, onTabChange }) => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState<number>(0);
  console.log(`NavbarTabs: Tab index is ${tabIndex}`);

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
        <Tab
          key={index}
          href={tab.href}
          label={t(tab.label)}
          disabled={tab.label === "aboutUs" || tab.label === "contactUs"}
        />
      ))}
    </Tabs>
  );
};

export default NavbarTabs;
