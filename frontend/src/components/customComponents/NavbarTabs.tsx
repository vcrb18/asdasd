import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { type TabProps } from "./Header";

interface NavbarTabsProps {
  tabs: TabProps[];
  onTabChange: (index: number) => void;
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ tabs, onTabChange }) => {
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
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default NavbarTabs;
