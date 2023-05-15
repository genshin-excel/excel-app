import React, { useState, useContext } from 'react';
import { Grid, Box, Button, Container, TextField } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Team } from '../../models/Team';
import { DBContext } from '../../database/Database';
import TeamDisplay from '../../components/TeamDisplay';

function Body() {
    const database = useContext(DBContext);
    const [teams, setTeams] = useState(database.getTeamDAO().getAllTeams());

    const handleCreateTeamClick = () => {
        const newTeamId = database.getConfigDAO().getNextId();
        const newTeam = {
            id: newTeamId,
            name: `Team ${newTeamId}`,
            characters: [null, null, null, null],
            dps: 0,
            dpr: 0,
        };
        const newTeams = database.getTeamDAO().addTeam(newTeam);
        setTeams(newTeams);
        window.scrollTo(0, 0);
    };

    const handleTeamChange = (team: Team, index: number) => {
        const newTeams = [...teams];
        newTeams[index] = team;
        setTeams(newTeams);
    }

    const handleDelete = (index: number) => {
        const newTeams = [...teams];
        newTeams.splice(index, 1);
        setTeams(newTeams);
    }

    return (
        <Container maxWidth="xl" sx={{ padding: 0 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleCreateTeamClick} sx={{ width: "100%" }}>
                                Create Team
                            </Button>
                        </Grid>
                    </Container>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                        <Container maxWidth="lg">
                            {teams.map((team, index) => (
                                <TeamCard key={team.name} team={team} onChange={(newTeam)=> handleTeamChange(newTeam, index)} onDelete={()=> handleDelete(index)}/>
                            ))}
                        </Container>
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </Container>
    );
}

const TeamCard = React.memo(({team, onChange, onDelete}: {team: Team, onChange: (team: Team) => void, onDelete: () => void}) => {
    console.log(team.name);
    return (
        <>
            <Grid container>
                <TeamDisplay
                    team={team}
                    onDelete={onDelete}
                    onTeamChange={onChange}
                />
            </Grid>
            <Grid container spacing={2} key={team.name} sx={{ marginTop: '10px' }}>
                <Grid item container xs={12} spacing={2} key="dpr">
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={team.dpr} label="DPR" disabled />
                    </Grid>
                    <Grid item xs={12} sm={6} key="dps">
                        <TextField fullWidth value={team.dps} label="DPS" disabled />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center" sx={{ mb: 2 }} key="button">
                    <Link to={`/TeamPage/${team.name}`}>
                        <Button variant="contained" color="primary" startIcon={<Calculate />} sx={{ maxWidth: '200px' }}>
                            Calculate
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}
// , (prevProps, nextProps) => {
//     // Custom comparison function to determine if the component should update
//     return prevProps.team.name === nextProps.team.name;
// }
);

export default Body;
