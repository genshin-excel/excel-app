import React, { useState, useContext, useEffect, Suspense, useCallback } from "react";
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

const TeamDetails: React.FC<TeamDetailsProps> = React.memo(
  ({ team, onDelete, onTeamChange }) => {
    console.log("TeamDetails");
    const navigate = useNavigate();

    const handleDelete = () => {
      onDelete();
      navigate("/");
    };

    return (
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "26px 0" }}>
          <Grid container>
            <Container maxWidth="xl">
              <Grid container item spacing={2} xs={6}>
                <Suspense fallback={null}>
                  <TeamDisplay team={team} onDelete={handleDelete} onTeamChange={onTeamChange} />
                </Suspense>
              </Grid>
              <Grid container item spacing={2} xs={6}></Grid>
            </Container>
          </Grid>
        </Box>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.team === nextProps.team;
  }
);

function TeamPage() {
  console.log("teamPage");
  const { teamIndex } = useParams();
  const database = useContext(DBContext);
  const [team, setTeam] = useState<Team>(emptyTeam);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamIndex) {
        navigate("/");
        return;
      }

      try {
        const fetchedTeam = await database.getTeamDAO().getTeamByName(teamIndex);
        if (!fetchedTeam) {
          navigate("/");
          return;
        }
  
        setTeam(fetchedTeam);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeam();
  }, [database, navigate, teamIndex]);

  const handleTeamChange = useCallback(
    (oldTeamName: string, newTeam: Team) => {
      navigate(`/TeamPage/${newTeam.name}`);
    },
    [navigate]
  );
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isLoaded ? (
        <TeamDetails team={team} onDelete={() => navigate("/")} onTeamChange={handleTeamChange} />
      ) : (
        <div>Loading...</div>
      )}
    </Suspense>
  );
}

export default TeamPage;
