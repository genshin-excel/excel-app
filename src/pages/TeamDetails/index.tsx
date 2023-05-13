import React, { useState, useContext, useEffect } from 'react';
import { Grid, Button, Box, OutlinedInput, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Add } from '@mui/icons-material';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Team, emptyTeam } from '../../models/Team';
import { DBContext } from '../../database/Database';
import TeamDisplay from '../../components/TeamDisplay';
import { Delay } from '../../util/Delay';

function TeamPage() {
    const database = useContext(DBContext);
    const { teamIndex } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(emptyTeam);

    // Delay();

    useEffect(() => {
        if (!teamIndex) {
            navigate('/');
            return;
            // return <Navigate to="/" />;
        }
        
        const fetchedTeam  = database.getTeamDAO().getTeamByName(teamIndex) as Team;
        if (!fetchedTeam ) {
            navigate('/');
            return;
        }

        setTeam(fetchedTeam);
        console.log(fetchedTeam);
    }, [database, navigate, teamIndex]);

    const handleTeamChange = (newTeam: Team) => {
        navigate(`/TeamPage/${newTeam.name}`)
    };
    
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
      
    if (!teamIndex) {
        return null;
    }
    console.log("Final: " + team.name);
    return (
        <Container maxWidth="xl" sx={{ padding: 0 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Grid container>
                        <Container maxWidth="xl">
                            <Grid container item spacing={2} xs={6}>
                            {team && (
                                <TeamDisplay
                                    team={team}
                                    onDelete={() => navigate('/')}
                                    onTeamChange={handleTeamChange}
                                /> )}           
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
                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}

export default TeamPage;