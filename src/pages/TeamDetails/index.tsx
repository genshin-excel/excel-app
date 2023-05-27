import React, { useContext, Suspense, useCallback, useState } from "react";
import { Grid, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Team } from "../../models/Team";
import { DBContext } from "../../database/Database";
import TeamDisplay from "../../components/TeamDisplay";
import DropDownSkills from "../../components/DropDownSkills";
import TabsInfo from "../../components/TabsInfo";
import TabsContent from "../../components/TabsContent";

function TeamDetails({ teamValue }: { teamValue: Team }) {
  console.log("TeamDetails");
  document.title = teamValue.name + " - Team Details";
  const navigate = useNavigate();
  const [team, setTeam] = useState(teamValue);
  const [selectedTab, setSelectedTab] = useState(0);
  const [lineCount, setLineCount] = useState(1);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = false;

  const handleTeamChange = useCallback(
    (oldTeamName: string, newTeam: Team) => {
      if (oldTeamName !== newTeam.name) {
        navigate(`/TeamPage/${newTeam.name}`);
      }
      setTeam(newTeam);
    },
    [navigate]
  );

  const addLine = () => {
    setLineCount(lineCount + 1);
  };

  return (
    <Grid container rowSpacing={2} display="flex">
      {isSmallScreen && (
        <>
          <Grid
            item
            xs={12}
            justifyContent="flex-end"
            sx={{
              position: "sticky",
              top: 50,
              zIndex: "10",
              background: "#fff",
            }}
          >
            <TabsInfo
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              position: "sticky",
              top: 100,
              zIndex: "10",
              background: "#fff",
            }}
          >
            <Suspense fallback={null}>
              <TeamDisplay
                team={team}
                onDelete={() => navigate("/")}
                onTeamChange={handleTeamChange}
              />
            </Suspense>
          </Grid>

          <Grid item container xs={12} display="flex" justifyContent="flex-end">
            <Grid
              item
              xs={12}
              sx={{ position: "sticky", top: 320, zIndex: 100 }}
            >
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  // md={6} sm={4}
                >
                  <TabsContent
                    selectedTab={selectedTab}
                    lineCount={lineCount}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              //  md={6} sm={4}
              xs={12}
              marginTop="16px"
            >
              {Array.from({ length: lineCount }).map((_, index) => (
                <DropDownSkills />
              ))}
            </Grid>

            <Grid
              item
              // md={6} sm={4}
              xs={12}
              marginTop="16px"
            >
              <Box display="flex" justifyContent="center" marginTop="16px">
                <Button variant="contained" color="primary" onClick={addLine}>
                  Add Line
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      {!isSmallScreen && (
        <>
          <Grid container>
            <Grid
              container
              item
              xs={12}
              sx={{
                position: "sticky",
                top: "56px",
                zIndex: 10,
                background: "#fff",
              }}
            >
              <Grid item md={6}>
                <Suspense fallback={null}>
                  <TeamDisplay
                    team={team}
                    onDelete={() => navigate("/")}
                    onTeamChange={handleTeamChange}
                  />
                </Suspense>
              </Grid>
              <Grid item md={6}></Grid>
              <Grid item md={6}></Grid>
              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <TabsInfo
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} marginTop="16px">
              <Grid item md={6} marginTop="16px">
                {Array.from({ length: lineCount }).map((_, index) => (
                  <DropDownSkills key={index} />
                ))}
              </Grid>
              <Grid item md={6}>
                <TabsContent selectedTab={selectedTab} lineCount={lineCount} />
              </Grid>
              <Grid item md={6} marginTop="16px">
                <Box display="flex" justifyContent="center" marginTop="16px">
                  <Button variant="contained" color="primary" onClick={addLine}>
                    Add Line
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
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
