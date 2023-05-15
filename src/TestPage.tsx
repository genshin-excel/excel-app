import React, { useState } from 'react';
import { Box, FormControl, Select, MenuItem, Button, Grid, Container } from '@material-ui/core';
import { Add } from '@material-ui/icons';

interface SelectedSkills {
    [key: string]: string;
}

interface LineState {
    selectedSkills: SelectedSkills;
}

const DropdownsLine = () => {
    const [lines, setLines] = useState<LineState[]>([{ selectedSkills: {} }]);

    const skills = [
        { id: 'skill1', options: ['None', 'Option 1', 'Option 2', 'Option 3'] },
        { id: 'skill2', options: ['Option 4', 'Option 5', 'Option 6'] },
        { id: 'skill3', options: ['Option 7', 'Option 8', 'Option 9'] },
        { id: 'skill4', options: ['Option 10', 'Option 11', 'Option 12'] }
    ];

    const handleSkillChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        skillId: string,
        lineIndex: number
    ) => {
        setLines((prevLines) => {
            const updatedLines = [...prevLines];
            updatedLines[lineIndex].selectedSkills = {
                ...updatedLines[lineIndex].selectedSkills,
                [skillId]: event.target.value as string
            };
            return updatedLines;
        });
    };

    const handleNewLine = () => {
        setLines((prevLines) => [...prevLines, { selectedSkills: {} }]);
    };

    return (
        <>
            <Container style={{ padding: 0 }}>
                {lines.map((line, lineIndex) => (
                    <Box mb={2} key={lineIndex}>
                        <Grid container spacing={2}>
                            {skills.map(({ id, options }) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                                    <FormControl fullWidth variant="outlined" style={{ margin: '10px 0' }}>
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
                    </Box>
                ))}
                <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
                    <Button onClick={handleNewLine} startIcon={<Add />} variant="outlined">
                        New Line
                    </Button>
                </Grid>
            </Container>
        </>
    );
};

export default DropdownsLine;
