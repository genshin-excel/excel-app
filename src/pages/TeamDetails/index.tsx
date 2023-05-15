import React, { useState, useContext, useEffect } from 'react';
import { Grid, Box, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Team, emptyTeam } from '../../models/Team';
import { DBContext } from '../../database/Database';
import TeamDisplay from '../../components/TeamDisplay';
import TestPage from '../../TestPage'
// import { Add } from '@material-ui/icons';

// interface SelectedSkills {
//     [key: string]: string;
// }

// interface LineState {
//     selectedSkills: SelectedSkills;
// }

function TeamPage() {
    const database = useContext(DBContext);
    const { teamIndex } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(emptyTeam);
    // const [lines, setLines] = useState<LineState[]>([{ selectedSkills: {} }]);


    useEffect(() => {
        if (!teamIndex) {
            navigate('/');
            return;
        }

        const fetchedTeam = database.getTeamDAO().getTeamByName(teamIndex) as Team;
        if (!fetchedTeam) {
            navigate('/');
            return;
        }

        setTeam(fetchedTeam);
        console.log(fetchedTeam);
    }, [database, navigate, teamIndex]);

    const handleTeamChange = (newTeam: Team) => {
        navigate(`/TeamPage/${newTeam.name}`);
    };

    if (!teamIndex) {
        return null;
    }
    console.log('Final: ' + team.name);
    // ===============================================
    // const skills = [
    //     { id: 'skill1', options: ['None', 'Option 1', 'Option 2', 'Option 3'] },
    //     { id: 'skill2', options: ['Option 4', 'Option 5', 'Option 6'] },
    //     { id: 'skill3', options: ['Option 7', 'Option 8', 'Option 9'] },
    //     { id: 'skill4', options: ['Option 10', 'Option 11', 'Option 12'] }
    // ];

    // const handleSkillChange = (
    //     event: any,
    //     skillId: string,
    //     lineIndex: number
    // ) => {
    //     setLines((prevLines) => {
    //         const updatedLines = [...prevLines];
    //         const selectedSkills = { ...updatedLines[lineIndex].selectedSkills };
    //         selectedSkills[skillId] = event.target.value as string;
    //         updatedLines[lineIndex].selectedSkills = selectedSkills;
    //         return updatedLines;
    //     });
    // };

    // const handleNewLine = () => {
    //     setLines((prevLines) => [...prevLines, { selectedSkills: {} }]);
    // };

    return (
        <Container maxWidth="xl" sx={{ padding: 0 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '26px 0' }}>
                    <Grid container>
                        <Container maxWidth="xl">
                            <Grid container item spacing={2} xs={6}>
                                {team && (
                                    <TeamDisplay team={team} onDelete={() => navigate('/')} onTeamChange={handleTeamChange} />
                                )}
                                <TestPage />
                                {/* {lines.map((line, lineIndex) => (
                                    <Grid item container xs={12} spacing={2} key={lineIndex}>
                                        {skills.map(({ id, options }) => (
                                            <Grid item xs={6} sm={3} key={id}>
                                                <FormControl fullWidth variant="outlined">
                                                    <Select
                                                        id={id}
                                                        value={line.selectedSkills[id] || ''}
                                                        onChange={(event) => handleSkillChange(event, id, lineIndex)}
                                                    >
                                                        {options.map((option, optionIndex) => (
                                                            <MenuItem key={optionIndex} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))} */}
                                {/* <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
                                    <Button onClick={handleNewLine} startIcon={<Add />} variant="outlined">
                                        New Line
                                    </Button>
                                </Grid> */}
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
