import React from "react";
import { Box, Paper } from "@mui/material";
import TabsDropdownComponents from "./TabsDropdownComponents";
import TabsTextFieldComponents from "./TabsTextFieldComponents";

function TabsContent({
  selectedTab,
  lineCount,
}: {
  selectedTab: number;
  lineCount: number;
}) {
  console.log("TabsContent: " + selectedTab);
  return (
    <Box
      p={0}
      sx={{
        display: "flex",
        overflowX: "auto",
        height: "100%",
        marginLeft: "32px",
        alignItems: "flex-end",
        paddingTop: "16px",
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "1px solid #adb5bd",
        flexDirection: "column",
      }}
      component={Paper}
    >
      {Array.from({ length: lineCount }).map((_, index) => (
        <Box p={0}
        key={index}
        sx={{
          display: "flex",
          maxWidth: "100%",
          marginBottom: "16px",
        }}
        >
          <TabsDropdownComponents />
          <TabsTextFieldComponents />
          <TabsTextFieldComponents />
          <TabsDropdownComponents />
          <TabsTextFieldComponents />
          <TabsTextFieldComponents />
          <TabsDropdownComponents />
          <TabsDropdownComponents />
          <TabsTextFieldComponents/>
          <TabsDropdownComponents />
        </Box>
      ))}
    </Box>
  );
}

export default TabsContent;
