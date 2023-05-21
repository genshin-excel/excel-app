import React, { useContext, Suspense, useCallback, useState } from "react";
import { Grid, Box, Container, FormControl, Select, MenuItem, Tabs, Tab, Paper } from "@mui/material";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Team } from "../../models/Team";
import { DBContext } from "../../database/Database";
import TeamDisplay from "../../components/TeamDisplay";

interface SelectedSkills {
  [key: string]: string;
}
interface LineState {
  selectedSkills: SelectedSkills;
}

function TeamDetails({ teamValue }: { teamValue: Team }) {
  console.log("TeamDetails");
  document.title = teamValue.name + " - Team Details";
  const navigate = useNavigate();
  const [team, setTeam] = useState(teamValue);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTeamChange = useCallback(
    (oldTeamName: string, newTeam: Team) => {
      if (oldTeamName !== newTeam.name) {
        navigate(`/TeamPage/${newTeam.name}`);
      }
      setTeam(newTeam);
    },
    [navigate]
  );

  const [lines, setLines] = useState<LineState[]>([{ selectedSkills: {} }]);

  const skills = [
    { id: "skill1", options: ["None", "Option 1", "Option 2", "Option 3"] },
    { id: "skill2", options: ["Option 4", "Option 5", "Option 6"] },
    { id: "skill3", options: ["Option 7", "Option 8", "Option 9"] },
    { id: "skill4", options: ["Option 10", "Option 11", "Option 12"] },
  ];

  const tabs = [
    { label: "Item One", info: "Info for Item One" },
    { label: "Item Two", info: "Info for Item Two" },
    { label: "Item Three", info: "Info for Item Three" },
    { label: "Item Four", info: "Info for Item Four" },
    { label: "Item Five", info: "Info for Item Five" },
    { label: "Item Six", info: "Info for Item Six" },
    { label: "Item Seven", info: "Info for Item Seven" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "26px 0" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Suspense fallback={null}>
              <TeamDisplay
                team={team}
                onDelete={() => navigate("/")}
                onTeamChange={handleTeamChange}
              />
            </Suspense>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              {lines.map((line, lineIndex) => (
                <Grid item container xs={12} key={lineIndex} spacing={2}>
                  {skills.map(({ id, options }) => (
                    <Grid item xs={6} sm={3} key={id}>
                      <FormControl fullWidth variant="outlined">
                        <Select id={id}>
                          {options.map((option, optionIndex) => (
                            <MenuItem key={optionIndex} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} container sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Box sx={{ flexGrow: 1 }} />
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="tabs"
                value={selectedTab}
                sx={{ marginBottom: "16px" }}
                onChange={handleTabChange}
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} />
                ))}
              </Tabs>
              {tabs.map((tab, index) => (
                <Box
                  key={index}
                  p={2}
                  sx={{
                    display: selectedTab === index ? "block" : "none",
                    marginTop: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  component={Paper}
                >
                  {tab.info}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TeamPage() {
  console.log("teamPage");
  const { teamIndex } = useParams();
  const database = useContext(DBContext);

  if (!teamIndex) {
    return <Navigate to="/" />;
  }
  var team = database.getTeamDAO().getTeamByName(teamIndex);
  if (!team) {
    return <Navigate to="/" />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamDetails teamValue={team} />
    </Suspense>
  );
}

export default TeamPage;
