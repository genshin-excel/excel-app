import React, { useState } from "react";
import {
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Grid,
} from "@mui/material";
import TabsDropdownComponents from "./TabsDropdownComponents";
import TabsTextFieldComponents from "./TabsTextFieldComponents";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function TabsContent({
  selectedTab,
  lineCount,
}: {
  selectedTab: number;
  lineCount: number;
}) {
  console.log("TabsContent: " + selectedTab);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  // const isSmallScreen = false;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {isSmallScreen && (
        <>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent={isSmallScreen ? "flex-end" : "flex-start"}
            sx={{
              overflowX: "auto",
              position: "fixed",
              top: "50%",
              right: 0,
              zIndex: 9999,
              width: "100%",
            }}
          >
            <IconButton
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              // hideBackdrop={true}
              onClose={toggleDrawer}
              PaperProps={{
                sx: {
                  marginTop: "16px",
                  maxHeight: "100%",
                  top: "55%",
                },
              }}
            >
              <Box
                p={0}
                sx={{
                  display: "flex",
                  overflowX: "auto",
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
                  <Box
                    p={0}
                    key={index}
                    sx={{
                      display: "flex",
                      maxWidth: "350px",
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
                    <TabsTextFieldComponents />
                    <TabsDropdownComponents />
                  </Box>
                ))}
              </Box>
            </Drawer>
          </Grid>
        </>
      )}

      {!isSmallScreen && (
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
            <Box
              p={0}
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
              <TabsTextFieldComponents />
              <TabsDropdownComponents />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}

export default TabsContent;
