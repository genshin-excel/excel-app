import React, { useState } from 'react';
import { Grid, Card, CardMedia, Box, Button, Typography, IconButton, Container, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit, Calculate } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const images = [
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200',
    'https://via.placeholder.com/200x200'
];

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
    const [, setSelectedImage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isCreateTeamClicked, setIsCreateTeamClicked] = useState(false);
    const [numTeams, setNumTeams] = useState(0);
    const [teamsArray, setTeamsArray] = useState<number[]>([]);

    const handleCreateTeamClick = () => {
        const newNumTeams = numTeams + 1;
        const newTeamsArray = Array.from({ length: newNumTeams }, (_, i) => i);
        setNumTeams(newNumTeams);
        setTeamsArray(newTeamsArray);
        setIsCreateTeamClicked(true);
        setSelectedImage(null);
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
                {isCreateTeamClicked && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <CreateTeam />
                            </Grid>
                        </Container>
                    </Box>
                )}
                <Dialogs />
            </Container>
        </Container>
    );

    function CreateTeam() {
        return (
            <Container maxWidth="lg">
                {teamsArray.slice(0).reverse().map((teamIndex) => (
                    <Grid container spacing={2} key={teamIndex}>
                        <Grid item container xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Typography variant="h4" component="h2">
                                Team {teamIndex + 1}
                            </Typography>
                            <IconButton aria-label="delete">
                                <Delete />
                            </IconButton>
                            <IconButton aria-label="edit">
                                <Edit />
                            </IconButton>
                        </Grid>
                        {images.map((image) => (
                            <Grid item xs={6} sm={3} key={image}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={image}
                                        alt="Placeholder image"
                                        onClick={() => {
                                            setSelectedImage(image);
                                            handleImageClick();
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="DPR" disabled />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="DPS" disabled />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} justifyContent="center" sx={{ mb: 2 }}>
                            <Link to={`/TeamPage/Team-${teamIndex + 1}`}>
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
                                            setSelectedImage(image);
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
