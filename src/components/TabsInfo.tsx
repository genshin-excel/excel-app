import { Grid, Tabs, Tab } from "@mui/material";
import React, { useCallback } from "react";

function TabsInfo({selectedTab, setSelectedTab}: { selectedTab: number, setSelectedTab: React.Dispatch<React.SetStateAction<number>> }) {
  console.log("TabsInfo");

  const tabs = [
    { label: "Item One", info: "Info for Item One" },
    { label: "Item Two", info: "Info for Item Two" },
    { label: "Item Three", info: "Info for Item Three" },
    { label: "Item Four", info: "Info for Item Four" },
    { label: "Item Five", info: "Info for Item Five" },
    { label: "Item Six", info: "Info for Item Six" },
    { label: "Item Seven", info: "Info for Item Seven" },
  ];

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    [setSelectedTab]
  );
  return (
    <Grid
      sx={{ 
      alignItems: "center", 
        overflowX: "auto",
    }
    }
    >
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="tabs"
        value={selectedTab}
        onChange={handleTabChange}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
    </Grid>
  );
}
export default TabsInfo;
