import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { TabProps } from "./Header";

interface NavbarTabsProps {
  tabs: TabProps[];
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState();

  return (
    <Tabs
      sx={{ marginLeft: "auto" }}
      textColor="inherit"
      className="tabs-text"
      value={tabIndex}
      onChange={(e, value) => {
        setTabIndex(value);
      }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default NavbarTabs;
