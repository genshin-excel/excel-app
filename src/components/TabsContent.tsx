import React from "react";
import {
  Box,
  Paper,
} from "@mui/material";
import TabsDropdownComponents from "./TabsDropdownComponents";
import TabsTextFieldComponents from "./TabsTextFieldComponents";

function TabsContent({
  selectedTab,
}: {
  selectedTab: number;
}) {
  console.log("TabsContent: " + selectedTab);
  return (
    <Box p={0}
      sx={{
        display: "flex",
        overflowX: 'auto',
        marginLeft: "40px",
        height: "100%",
        alignItems: "flex-end",
        paddingTop: "16px",
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "1px solid #adb5bd",
      }}
      component={Paper}
    >
      <TabsDropdownComponents />
      <TabsTextFieldComponents />
      <TabsTextFieldComponents />
      <TabsDropdownComponents />
      <TabsTextFieldComponents />
      <TabsTextFieldComponents />
      <TabsDropdownComponents />
      <TabsDropdownComponents />
      <TabsTextFieldComponents />
    </Box>
  );
}

export default TabsContent;
