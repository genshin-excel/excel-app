import React, { useState, useContext } from 'react';
import { Grid, Box, Button, Container, TextField } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Team } from './models/Team';
import { Character } from './models/Character';
import { PickCharacterProps } from './CharacterPopUp';
import { DBContext } from './database/Database';
import TeamDisplay from './components/TeamDisplay';
import { GenerateIdDAO } from './database/dao/GenerateIdDAO';
import TeamName from './components/TeamName';

function Body() {
    const database = useContext(DBContext);
    const [teams, setTeams] = useState(database.getTeamDAO().getAllTeams());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [generateIdDAO, setGenerateIdDAO] = useState(new GenerateIdDAO(0, database.storage));
    const handleCreateTeamClick = () => {
        const newTeamId = generateIdDAO.getTeamGenerateId() + 1;
        generateIdDAO.setTeamGenerateId(newTeamId);
        const newTeam = {
            id: newTeamId,
            name: `Team ${newTeamId}`,
            characters: [null, null, null, null],
            dps: 0,
            dpr: 0,
        };
        database.getTeamDAO().addTeam(newTeam);
        setTeams(database.getTeamDAO().getAllTeams());
        window.scrollTo(0, 0);
    };
    const nullTeam: PickCharacterProps = {
        team: null,
        charIndex: -1,
    }
    const [openDialog, setOpenDialog] = useState(nullTeam);
    const setSelectedImage = (character: Character, team: Team, charIndex: number) => {
        const newTeams = teams.map((t) => {
            if (t === team) {
                t.characters[charIndex] = character;
                return { ...t };
            }
            return t;
        });
        setTeams(newTeams);
        localStorage.setItem('teams', JSON.stringify(newTeams));
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
        const handleDeleteClick = (team: Team) => {
            const newTeams = teams.filter((t) => t !== team);
            setTeams(newTeams);
            localStorage.setItem('teams', JSON.stringify(newTeams));
            setEditingTeam(null);
        };
        const [teamName, setTeamName] = useState('');
        const [editingTeam, setEditingTeam] = useState<Team | null>(null);
        const handleEditClick = (team: Team) => {
            setEditingTeam(team);
            setTeamName(team.name);
        };
        const handleChangeTeamName = (team: Team, newName: string) => {
            const newTeams = teams.map((t) => {
                if (t === team) {
                    return { ...t, name: newName };
                }
                return t;
            });
            setTeams(newTeams);
            localStorage.setItem('teams', JSON.stringify(newTeams));
        };
        const handleBlur = () => {
            if (editingTeam && teamName !== '') {
                handleChangeTeamName(editingTeam, teamName);
                setEditingTeam(null);
                setTeamName('');
            }
        };
        return (
            <>
                <Grid container>
                    <TeamName team={team} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} setTeamName={setTeamName} editingTeam={editingTeam} teamName={teamName} handleBlur={handleBlur} />
                    <TeamDisplay team={team} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} setTeamName={setTeamName} editingTeam={editingTeam} teamName={teamName} handleBlur={handleBlur} setSelectedImage={setSelectedImage} openDialog={openDialog} setOpenDialog={setOpenDialog} />
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
