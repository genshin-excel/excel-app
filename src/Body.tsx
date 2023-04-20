import React, { useState } from 'react';
import { Grid, Card, CardMedia, Box, Button, Typography, IconButton, Container, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit, Calculate } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import {Team} from './models/Team'

const character = [
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
];

function Body() {
    const [teams, setTeams] = useState(JSON.parse(localStorage.getItem('teams') || '') as Team[] || []);

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleCreateTeamClick = () => {
        const idNum = parseInt(localStorage.getItem('team_generate_id') || '1');
        localStorage.setItem('team_generate_id', (idNum + 1).toString());
        console.log(idNum + " | " + localStorage.getItem('team_generate_id'))
        const newTeam = {
            name: "Team " + idNum,
            characters: [],
            dps: 0,
            dpr: 0,
        
        }
        let newTeams = [newTeam, ...teams]
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
                <Dialogs />
            </Container>
        </Container>
    );

    function CreateTeam() {
        return (
            <Container maxWidth="lg">
                {teams.map(team => (
                    <Grid container spacing={2}>
                        <Grid item key="a" container xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Typography variant="h4" component="h2">
                                {team.name}
                            </Typography>
                            <IconButton aria-label="delete">
                                <Delete />
                            </IconButton>
                            <IconButton aria-label="edit">
                                <Edit />
                            </IconButton>
                        </Grid>
                        {[0,1,2,3].map((index) => (
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
                        <Grid item key="b" container spacing={2}>
                            <Grid item xs={12} sm={6} key="g">
                                <TextField fullWidth label="DPR" disabled />
                            </Grid>
                            <Grid item xs={12} sm={6} key="h">
                                <TextField fullWidth label="DPS" disabled />
                            </Grid>
                        </Grid>
                        <Grid item key="c" container xs={12} justifyContent="center" sx={{ mb: 2 }}>
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

    function Dialogs() {
        const [searchValue, setSearchValue] = useState('');

        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
        };

        const handleSearch = () => {
            console.log('Search value:', searchValue);
        };

        return (
            <Dialog open={showPopup} onClose={handleClose}>
                <DialogTitle>Select Character</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ marginBottom: '16px', marginTop: '6px' }}
                    />
                    <Grid container spacing={2} justifyContent="start">
                        {character.map((image) => (
                            <Grid item xs={6} sm={4} md={3} key={image}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={image}
                                        alt="Placeholder image"
                                        onClick={() => {
                                            handleImageClick();
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default Body;
