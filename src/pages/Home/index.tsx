import React, { useState, useContext } from 'react';
import { Grid, Box, Button, Container, TextField } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Team } from '../../models/Team';
import { Character } from '../../models/Character';
import { PickCharacterProps } from '../../components/CharacterPopUp';
import { DBContext } from '../../database/Database';
import TeamDisplay from '../../components/TeamDisplay';
import { handleDeleteClick, handleEditClick, handleBlur, handleChangeTeamName, updateSelectedImage } from '../../components/eventHandlers/EventHandlers';

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

    const nullTeam: PickCharacterProps = {
        team: null,
        charIndex: -1,
    }

    const [openDialog, setOpenDialog] = useState(nullTeam);

    const setSelectedImage = (character: Character, team: Team, charIndex: number) => {
        updateSelectedImage(character, team, charIndex, database, setTeams);
    };

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
                            <ListTeams />
                        </Grid>
                    </Container>
                </Box>
            </Container>
        </Container>
    );

    function ListTeams() {
        return (
            <Container maxWidth="lg">
                {teams.map((team) => (
                    <DisplayTeam key={team.name} team={team} />
                ))}
            </Container>
        );
    }

    function DisplayTeam(props: { team: Team }) {
        const { team } = props;
        const [teamName, setTeamName] = useState('');
        const [editingTeam, setEditingTeam] = useState<Team | null>(null);

        return (
            <>
                <Grid container>
                    <TeamDisplay
                        team={team}
                        handleDeleteClick={() => handleDeleteClick(team, database, setTeams, setEditingTeam)}
                        handleEditClick={() => handleEditClick(team, setEditingTeam, setTeamName)}
                        setTeamName={setTeamName}
                        editingTeam={editingTeam}
                        teamName={teamName}
                        handleBlur={() => handleBlur(editingTeam, teamName, handleChangeTeamName, setEditingTeam, setTeamName, database, setTeams)}
                        setSelectedImage={setSelectedImage}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
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
}

export default Body;
