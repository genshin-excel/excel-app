import React, {
  useContext,
  Suspense,
  useCallback,
  useState,
  Fragment,
} from "react";
import { Grid, Button, Box } from "@mui/material";
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
      <Grid item xs={12} display="flex">
        <Grid item md={6} sm={7} xs={11}>
          <Suspense fallback={null}>
            <TeamDisplay
              team={team}
              onDelete={() => navigate("/")}
              onTeamChange={handleTeamChange}
            />
          </Suspense>
        </Grid>
        <Grid
          item
          md={6}
          sm={5}
          xs={1}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <TabsInfo selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </Grid>
      </Grid>

      <Grid item container xs={12} display="flex">
        <Grid item md={6} sm={7} xs={11} marginTop="16px">
          {Array.from({ length: lineCount }).map((_, index) => (
            <DropDownSkills />
          ))}
        </Grid>
        <Grid item md={6} sm={5} xs={1}>
          <TabsContent selectedTab={selectedTab} lineCount={lineCount}/>
        </Grid>
        <Grid item md={6} sm={7} xs={11} marginTop="16px">
          <Box display="flex" justifyContent="center" marginTop="16px">
            <Button variant="contained" color="primary" onClick={addLine}>
              Add Line
            </Button>
          </Box>
        </Grid>
      </Grid>
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
