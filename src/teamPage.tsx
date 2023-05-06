import React, { useState, useRef, useEffect, lazy } from 'react';
import { Grid, Card, CardMedia, Button, Box, Typography, OutlinedInput, IconButton, Container, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Team } from './models/Team';
import { Character } from './models/Character';
import { PickCharacterProps } from './CharacterPopUp';
import EditTextField from './EditTextField';


const Dialogs = lazy(() => import('./CharacterPopUp'))

function TeamPage() {
    const [teams, setTeams] = useState(localStorage.getItem('teams') ? JSON.parse(localStorage.getItem('teams')!) as Team[] : []);

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
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Grid container>
                        <TeamComp />
                    </Grid>
                </Box>
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

        const location = useLocation();
        const currentTeamName = decodeURIComponent(location.pathname.split('/').filter((p) => p !== '').pop()?.replace(/\+/g, ' ') || '');
        const teamDisplay = teams.filter(team => team.name === currentTeamName);

        const navigate = useNavigate();
        const handleChangeTeamName = (team: Team, newName: string) => {
            const newTeams = teams.map((t) => {
                if (t === team) {
                    return { ...t, name: newName };
                }
                return t;
            });
            setTeams(newTeams);
            setTeamName(newName);
            localStorage.setItem('teams', JSON.stringify(newTeams));
            navigate(`/TeamPage/${newName}`);
        };

        const handleBlur = () => {
            if (editingTeam && teamName !== '') {
                handleChangeTeamName(editingTeam, teamName);
                setEditingTeam(null);
                setTeamName('');
            }
        };

        return (
            <Container maxWidth="xl">
                <Grid container item spacing={2} xs={6}>
                    {teamDisplay.map((team) => (
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
}
export default TeamPage;