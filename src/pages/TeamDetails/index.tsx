import React, { useState, useContext, useEffect, useMemo, Suspense } from "react";
import { Grid, Box, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Team, emptyTeam } from "../../models/Team";
import { DBContext } from "../../database/Database";
import TeamDisplay from "../../components/TeamDisplay";

interface TeamDetailsProps {
  team: Team;
  onDelete: () => void;
  onTeamChange: (oldTeamName: string, newTeam: Team) => void;
}

function useFetchTeam(teamIndex: string | undefined) {
  const database = useContext(DBContext);
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team>(emptyTeam);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamIndex) {
        return;
      }

      const fetchedTeam = await database.getTeamDAO().getTeamByName(teamIndex);
      if (!fetchedTeam) {
        navigate("/");
        return;
      }

      setTeam(fetchedTeam);
      setIsLoaded(true);
    };

    fetchTeam();
  }, [database, navigate, teamIndex]);

  const handleTeamChange = useMemo(() => (oldTeamName: string, newTeam: Team) => {
    navigate(`/TeamPage/${newTeam.name}`);
  }, [navigate]);

  return { team, handleTeamChange, isLoaded };
}

function TeamDetails({ team, onDelete, onTeamChange }: TeamDetailsProps) {
  return (
    <Suspense fallback={null}>
      <TeamDisplay team={team} onDelete={onDelete} onTeamChange={onTeamChange} />
    </Suspense>
  );
}

function TeamPage() {
  const { teamIndex } = useParams<{ teamIndex: string }>();
  const { team, handleTeamChange, isLoaded } = useFetchTeam(teamIndex);
  const navigate = useNavigate();

  if (!teamIndex || !isLoaded) {
    return null;
  }

  console.log("TeamPage: " + team.name);

  return (
    <Container maxWidth="xl" sx={{ padding: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "26px 0" }}>
        <Grid container>
          <Container maxWidth="xl">
            <Grid container item spacing={2} xs={6}>
              <Suspense fallback={null}>
                <TeamDetails
                  team={team}
                  onDelete={() => navigate("/")}
                  onTeamChange={handleTeamChange}
                />
              </Suspense>
            </Grid>
            <Grid container item spacing={2} xs={6}></Grid>
          </Container>
        </Grid>
      </Box>
    </Container>
  );
}

export default TeamPage;
