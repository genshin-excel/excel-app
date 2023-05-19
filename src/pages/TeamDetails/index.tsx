import React, { useContext, Suspense, useCallback, useState } from "react";
import { Grid, Box, Container } from "@mui/material";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Team } from "../../models/Team";
import { DBContext } from "../../database/Database";
import TeamDisplay from "../../components/TeamDisplay";

function TeamDetails({ teamValue }: { teamValue: Team }) {
  console.log("TeamDetails");
  document.title = teamValue.name + " - Team Details";
  const navigate = useNavigate();
  const [team, setTeam] = useState(teamValue);

  const handleTeamChange = useCallback(
    (oldTeamName: string, newTeam: Team) => {
      if (oldTeamName !== newTeam.name) {
        navigate(`/TeamPage/${newTeam.name}`);
      }
      setTeam(newTeam);
    },
    [navigate]
  );

  return (
    // <Container maxWidth="xl" sx={{ padding: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "26px 0" }}>
        {/* <Grid container> */}
          <Container maxWidth="xl">
            <Grid container spacing={2} maxWidth="sm">
              <Suspense fallback={null}>
                <TeamDisplay
                  team={team}
                  onDelete={() => navigate("/")}
                  onTeamChange={handleTeamChange}
                />
              </Suspense>
            </Grid>
            {/* <Grid container item spacing={2} xs={6}></Grid> */}
          </Container>
        {/* </Grid> */}
      </Box>
    // {/* </Container> */}
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
