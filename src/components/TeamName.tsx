import React from 'react';
import EditTextField from './EditTextField';
import { Delete, Edit } from '@mui/icons-material';
import { Grid, Typography, IconButton } from '@mui/material';
import { Team } from '../models/Team';

interface TeamDisplayItemProps {
    team: Team;
    editingTeam: Team | null;
    teamName: string;
    handleBlur: () => void;
    handleDeleteClick: (team: Team) => void;
    handleEditClick: (team: Team) => void;
    setTeamName: (name: string) => void;
}

function TeamName({
    team,
    editingTeam,
    teamName,
    handleBlur,
    handleDeleteClick,
    handleEditClick,
    setTeamName,
}: TeamDisplayItemProps) {
    return (
        <Grid container spacing={2} key={team.name}>
            <Grid item container key={team.name} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px', marginBottom: '10px' }}>
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
        </Grid>
    );
}

export default TeamName;
