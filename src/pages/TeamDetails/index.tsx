import React, { useState, useContext } from 'react';
import { Grid, Button, Box, OutlinedInput, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Team } from '../../models/Team';
import { Character } from '../../models/Character';
import { PickCharacterProps } from '../../components/CharacterPopUp';
import { DBContext } from '../../database/Database';
import TeamDisplay from '../../components/TeamDisplay';
import { handleDeleteClick, handleEditClick, handleBlur, handleChangeTeamName, updateSelectedImage } from '../../components/eventHandlers/EventHandlers';

interface TeamDisplayProps {
    handleDeleteClick: (team: Team) => void;
    handleEditClick: (team: Team) => void;
    setTeamName: (name: string) => void;
    editingTeam: Team | null;
    teamName: string;
    handleBlur: () => void;
    setSelectedImage: (character: Character, team: Team, charIndex: number) => void;
    openDialog: PickCharacterProps;
    setOpenDialog: (dialog: PickCharacterProps) => void;
}

function TeamPage() {
    const database = useContext(DBContext);
    const [teams, setTeams] = useState(database.getTeamDAO().getAllTeams());
    const [teamName, setTeamName] = useState('');
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);
    const { teamIndex } = useParams();
    const team = teams.find((team) => team.name === teamIndex) as Team;

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
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Grid container>
                        <TeamComp
                            editingTeam={editingTeam}
                            teamName={teamName}
                            setSelectedImage={setSelectedImage}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            handleBlur={() => handleBlur(editingTeam, teamName, handleChangeTeamName, setEditingTeam, setTeamName, database, setTeams)}
                            handleDeleteClick={() => handleDeleteClick(team, database, setTeams, setEditingTeam)}
                            handleEditClick={() => handleEditClick(team, setEditingTeam, setTeamName)}
                            setTeamName={setTeamName}
                        />
                    </Grid>
                </Box>
            </Container>
        </Container>
    );

    function TeamComp({
        editingTeam,
        teamName,
        setSelectedImage,
        openDialog,
        setOpenDialog,
        handleBlur,
        handleDeleteClick,
        handleEditClick,
        setTeamName
    }: TeamDisplayProps) {
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

        const { teamIndex } = useParams();
        const teamDisplay = teams.filter((team: Team) => team.name === teamIndex);

        return (
            <Container maxWidth="xl">
                <Grid container item spacing={2} xs={6}>
                    {teamDisplay.map((team, index) => (
                        <TeamDisplay
                            key={index}
                            team={team}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                            setTeamName={setTeamName}
                            editingTeam={editingTeam}
                            teamName={teamName}
                            handleBlur={handleBlur}
                            setSelectedImage={setSelectedImage}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                        />
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