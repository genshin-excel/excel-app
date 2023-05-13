import React, { lazy, Suspense } from 'react';
import { Team } from '../models/Team';
import { Character } from '../models/Character';
import { PickCharacterProps } from './CharacterPopUp';
import { Grid, Card, CardMedia, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditTextField from './EditTextField';
import { Alert } from './Alert';

const Dialogs = lazy(() => import('./CharacterPopUp'))

interface TeamDisplayProps {
    team: Team;
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

function TeamDisplay({
    team,
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
    const nullTeam: PickCharacterProps = {
        team: null,
        charIndex: -1,
    }

    const handleDelete = () => {
        handleDeleteClick(team);
    }

    return (
        <>
            <Grid container spacing={2} key={team.name}>
                <Grid item container key={team.name} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px', marginBottom: '10px' }}>
                    {editingTeam === team ? (
                        <EditTextField value={teamName} editFunc={setTeamName} onBlur={handleBlur} />
                    ) : (
                        <>
                            <Typography variant="h4" component="h2">
                                {team.name}
                            </Typography>
                            <Alert handleDelete={handleDelete}>
                                <IconButton aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </Alert>
                            <IconButton aria-label="edit" onClick={() => handleEditClick(team)}>
                                <Edit />
                            </IconButton>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                {[0, 1, 2, 3].map((index) => (
                    <Grid item xs={6} sm={3} key={index}>
                        <Card>
                            <CardMedia component="img" image={team.characters[index]?.thumbnail || process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="team member" onClick={() => setOpenDialog({ team: team, charIndex: index })} />
                        </Card>
                        {openDialog.team === team && openDialog.charIndex === index && (
                            <Suspense fallback={null}>
                                <Dialogs onClose={() => setOpenDialog(nullTeam)} onSelectImage={(pickedChar: Character) => setSelectedImage(pickedChar, team, index)} oldChar={team.characters[index]} />
                            </Suspense>
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default TeamDisplay;
