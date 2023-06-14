import React, {
  useContext,
  Suspense,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { Grid, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { Team } from "../../models/Team";
import { DBContext } from "../../database/Database";
import TeamDisplay from "../../components/TeamDisplay";
import DropDownSkills from "../../components/DropDownSkills";
import TabsTitle from "../../components/TabsTitle";
import TabsContent from "../../components/TabsContent";
import TableTabs from "../../components/TableTabs";
import BuildIcon from '@mui/icons-material/Build';
// import DialogEq from "../../components/DialogEq";

function TeamDetails({ teamValue }: { teamValue: Team }) {
  console.log("TeamDetails");
  document.title = teamValue.name + " - Team Details";
  const navigate = useNavigate();
  const [team, setTeam] = useState(teamValue);
  const [selectedTab, setSelectedTab] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const [openCharConfig, setOpenCharConfig] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lineCount]);

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
              paddingTop: 0,
            }}
          >
            <TabsTitle
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Grid>
          {selectedTab === 0 && (
            <Grid
              item
              xs={12}
              sx={{
                position: "sticky",
                top: 105,
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
          )}

          <Grid item container xs={12} display="flex" justifyContent="flex-end">
            <Grid item xs={12} marginTop="16px">
              <TabsContent selectedTab={selectedTab} lineCount={lineCount} />
            </Grid>

            {selectedTab !== 1 && (
              <Grid item xs={12} marginTop="16px">
                <Box display="flex" justifyContent="center" marginTop="16px">
                  <Button variant="contained" color="primary" onClick={addLine}>
                    Add Line
                  </Button>
                </Box>
              </Grid>
            )}
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
                top: "64px",
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
              <Grid
                item
                md={6}
                sx={{
                  paddingLeft: "32px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <TableTabs />
              </Grid>
              <Grid
                item
                container
                md={6}
                display="flex"
                columnSpacing={2}
                mt={1}
              >
                {/* <Grid item md={3}> */}
                {[0, 1, 2, 3].map((value) => (
                  <Grid item md={3} key={value}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<BuildIcon/>}
                      component={Link}
                      to={`${value+1}`}
                    >
                      Config
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <TabsTitle
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} marginTop="16px">
              <Grid item md={6} marginTop="16px">
                <DropDownSkills lineCount={lineCount} />
              </Grid>
              <Grid item md={6} paddingLeft="32px">
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
      <Grid item xs={12} ref={scrollRef} />
    </Grid>
  );
}

function TeamPage() {
  console.log("teamPage");
  const { teamIndex } = useParams();
  const database = useContext(DBContext);

  if (!teamIndex || Number.isNaN(teamIndex)) {
    return <Navigate to="/" />;
  }
  var team = database.getTeamDAO().getTeamById(Number(teamIndex));
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
