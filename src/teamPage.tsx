import React, { useState } from 'react';
import { Grid, Card, CardMedia, Button, Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, DialogContentText, OutlinedInput, IconButton, Container, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

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

function TeamPage() {
    const { teamIndex } = useParams();
    const [, setSelectedImage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    // const localData = localStorage.getItem('teams');
    // const teamData = JSON.parse(localData);

    const handleImageClick = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const [openEq, setOpenEq] = useState(false);

    const handleAddEqClick = () => {
        setOpenEq(true);
    };

    const handleEqClose = () => {
        setOpenEq(false);
    };

    return (
        <Container maxWidth="xl" sx={{ padding: 0 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Grid container>
                        <TeamComp />
                    </Grid>
                </Box>
                <Dialogs />
                <DialogEq />
            </Container>
        </Container>
    );

    function TeamComp() {
        const [selectedSkills, setSelectedSkills] = useState<Record<string, string>>({});
        const [numLines, setNumLines] = useState(1);

        const handleNewLine = () => {
            setNumLines(numLines + 1);
        };

        const handleSkillChange = (event: any, skillId: string) => {
            setSelectedSkills((prevSelectedSkills) => ({
                ...prevSelectedSkills,
                [skillId]: event.target.value
            }));
        };
        const skills = [
            { id: 'skill1', label: 'Choose Skill', options: ['Skill 1', 'Skill 2', 'Skill 3'] },
            { id: 'skill2', label: 'Choose Skill', options: ['Skill 1', 'Skill 2', 'Skill 3'] },
            { id: 'skill3', label: 'Choose Skill', options: ['Skill 1', 'Skill 2', 'Skill 3'] },
            { id: 'skill4', label: 'Choose Skill', options: ['Skill 1', 'Skill 2', 'Skill 3'] }
        ];



        return (
            <Container maxWidth="xl">
                <Grid container item spacing={2} xs={6}>
                    <Grid item container xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Typography variant="h4" component="h2">
                            {teamIndex}
                        </Typography>
                        <IconButton aria-label="delete">
                            <Delete />
                        </IconButton>
                        <IconButton aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Grid>
                    {images.map((image, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image={image}
                                    alt="Placeholder image"
                                    onClick={() => {
                                        setSelectedImage(image);
                                        handleImageClick();
                                    }}
                                />
                                <IconButton
                                    aria-label="add"
                                    onClick={handleAddEqClick}
                                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                    {[...Array(numLines)].map((line, index) => (
                        <Grid item container xs={12} spacing={2} key={index}>
                            {skills.map((skill) => (
                                <Grid item xs={6} sm={3} key={skill.id}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor={skill.id}>{skill.label}</InputLabel>
                                        <Select
                                            label={skill.label}
                                            value={selectedSkills[skill.id] || ""}
                                            onChange={(event) => handleSkillChange(event, skill.id)}
                                            input={<OutlinedInput label={skill.label} id={skill.id} />}
                                        >
                                            {skill.options.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                    <Grid container justifyContent="center">
                        <Box m={2}>
                            <FormControl fullWidth variant="outlined">
                            </FormControl>
                            <Button onClick={handleNewLine}
                                startIcon={<Add />}
                                variant="outlined"
                            >
                                New Line
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container item spacing={2} xs={6}>

                </Grid>
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
                        {character.map((image, i) => (
                            <Grid item xs={6} sm={4} md={3} key={i}>
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

    function DialogEq() {
        const substats = ["HP%", "HP", "ATK%", "ATK", "DEF%", "DEF", "EM", "ER", "CR", "CD", "Total Rolls"];
        return (
            <Dialog open={openEq} onClose={handleClose} maxWidth="xl" sx={{ width: '100%' }}>
                <DialogTitle>Add Equipment</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <DialogContentText>
                        This is where you manage to add equipment.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image='https://via.placeholder.com/200x200'
                                    alt="Placeholder image"
                                />
                                <IconButton
                                    aria-label="add"
                                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image='https://via.placeholder.com/200x200'
                                    alt="Placeholder image"
                                />
                                <IconButton
                                    aria-label="add"
                                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Substats</TableCell>
                                        {substats.map((substat, index) => (
                                            <TableCell key={index} align="center">{substat}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Rolls</TableCell>
                                        {substats.map((substat, index) => (
                                            <TableCell key={index}>
                                                <TextField variant="outlined" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEqClose}>Cancel</Button>
                    <Button onClick={handleEqClose}>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default TeamPage;