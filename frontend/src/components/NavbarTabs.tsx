import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

interface TabProps {
  label: string;
}

interface NavbarTabsProps {
  tabs: TabProps[];
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState();

  return (
    <Tabs
      sx={{ marginLeft: "auto" }}
      textColor="inherit"
      className="tabs-text"
      value={value}
      onChange={(e, value) => {
        setValue(value);
      }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default NavbarTabs;
