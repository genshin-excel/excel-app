import React, { useState, useRef, useEffect, lazy, useContext } from 'react';
import { Grid, Card, CardMedia, Box, Button, Typography, IconButton, Container, TextField } from '@mui/material';
import { Delete, Edit, Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Team } from './models/Team';
import { Character } from './models/Character';
import { PickCharacterProps } from './CharacterPopUp';
import EditTextField from './EditTextField';
import { DBContext } from './database/Database';

const Dialogs = lazy(() => import('./CharacterPopUp'))

function Body() {
    const database = useContext(DBContext)
    const [teams, setTeams] = useState(database.getTeamDAO().getAllTeams());

    const handleCreateTeamClick = () => {
        const idNum = parseInt(localStorage.getItem('team_generate_id') || '1');
        const newTeam = {
            name: `Team ${idNum}`,
            characters: [null, null, null, null],
            dps: 0,
            dpr: 0,
        };
        database.getTeamDAO().addTeam(newTeam);
        setTeams(database.getTeamDAO().getAllTeams());
        localStorage.setItem('team_generate_id', (idNum + 1).toString());
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
                            <Container maxWidth="lg">
                                <Button variant="contained" color="primary" onClick={handleCreateTeamClick} sx={{ width: "100%" }}>
                                    Create Team
                                </Button>
                            </Container>
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
            <Container maxWidth="lg">
                {teams.map((team, index) => (
                    <Grid container spacing={2} key={team.name}>
                        <Grid item container key={team.name} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {editingTeam === team ? (
                                <EditTextField value={teamName} editFunc={setTeamName} onBlur={handleBlur} />
                            ) : (
                                <>
                                    <Typography variant="h4" component="h2">
                                        {team.name}
                                    </Typography>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(team)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(team)}>
                                        <Edit />
                                    </IconButton>
                                </>
                            )}
                        </Grid>
                        {[0, 1, 2, 3].map((index) => (
                            <Grid item xs={6} sm={3} key={index}>
                                <Card>
                                    <CardMedia component="img" image={team.characters[index]?.thumbnail || process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="team member" onClick={() => setOpenDialog({ team: team, charIndex: index })} />
                                </Card>
                                {openDialog.team === team && openDialog.charIndex === index && (
                                    <Dialogs onClose={() => setOpenDialog(nullTeam)} onSelectImage={(pickedChar: Character) => setSelectedImage(pickedChar, team, index)} oldChar={team.characters[index]} />
                                )}
                            </Grid>
                        ))}
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
                ))}
            </Container>
        );
    }
}

export default Body;
