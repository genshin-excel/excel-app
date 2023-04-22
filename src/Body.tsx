import React, { useState, lazy } from 'react';
import { Grid, Card, CardMedia, Box, Button, Typography, IconButton, Container, TextField } from '@mui/material';
import { Delete, Edit, Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Team } from './models/Team'

const Dialogs = lazy(() => import('./CharacterPopUp'))

function Body() {
    const [teams, setTeams] = useState(JSON.parse(localStorage.getItem('teams') || '') as Team[] || []);

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleCreateTeamClick = () => {
        const idNum = parseInt(localStorage.getItem('team_generate_id') || '1');
        localStorage.setItem('team_generate_id', (idNum + 1).toString());
        const newTeamNum = teams.length + 1;
        const newTeam = {
            name: `Team ${newTeamNum}`,
            characters: [],
            dps: 0,
            dpr: 0,
        };
        let newTeams = [newTeam, ...teams];
        setTeams(newTeams);
        localStorage.setItem('teams', JSON.stringify(newTeams));
        setShowPopup(false);
        window.scrollTo(0, 0);
    };



    const handleImageClick = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

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
                            <CreateTeam />
                        </Grid>
                    </Container>
                </Box>
                <Dialogs open={showPopup} onClose={handleClose} />
            </Container>
        </Container>
    );

    function CreateTeam() {
        const handleDeleteClick = (team: Team) => {
            const newTeams = teams.filter((t) => t !== team);
            setTeams(newTeams);
            localStorage.setItem('teams', JSON.stringify(newTeams));
            localStorage.setItem('team_generate_id', (parseInt(localStorage.getItem('team_generate_id') || '1') - 1).toString());
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
                    <Grid container spacing={2} key={index}>
                        <Grid item container xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {editingTeam === team ? (
                                <TextField
                                    value={teamName}
                                    onChange={(event) => setTeamName(event.target.value)}
                                    onBlur={handleBlur}
                                />
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
                                    <CardMedia
                                        component="img"
                                        image={team.characters[index]?.thumbnail || process.env.PUBLIC_URL + '/images/characters/add_new_4.png'}
                                        alt={team.characters[index]?.name || 'null'}
                                        onClick={() => {
                                            handleImageClick();
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="DPR" disabled />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="DPS" disabled />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} justifyContent="center" sx={{ mb: 2 }}>
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
