import { useState, useCallback } from "react";
import {
  Grid,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function TabsInfo({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}) {
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent={isSmallScreen ? "space-between" : "flex-start"}
      sx={{ overflowX: "auto" }}
    >
      {isSmallScreen && (
        <>
          <IconButton color="primary" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
            <List>
              {tabs.map((tab, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedTab === index}
                  onClick={() => {
                    setSelectedTab(index);
                    toggleDrawer();
                  }}
                >
                  <ListItemText primary={tab.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}
      {!isSmallScreen && (
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
      )}
    </Grid>
  );
}

export default TabsInfo;
