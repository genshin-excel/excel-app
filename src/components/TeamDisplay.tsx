import React, { lazy, Suspense, useContext, useState } from 'react';
import { Team } from '../models/Team';
import { Character } from '../models/Character';
import { PickCharacterProps } from './CharacterPopUp';
import { Grid, Card, CardMedia, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditTextField from './EditTextField';
import { Alert, ErrorName } from './Alert';
import { DBContext } from '../database/Database';


const CharacterPopup = lazy(() => import('./CharacterPopUp'))

function TeamDisplay({ team, onDelete, onTeamChange }: { team: Team, onDelete: () => void, onTeamChange: (oldTeamName: string, newTeam: Team) => void }) {
    const database = useContext(DBContext);
    const [isEditingName, setIsEditingName] = useState(false);
    const [error, setError] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    console.log("TeamDisplay: " + team.name);

    const nullTeam: PickCharacterProps = {
        team: null,
        charIndex: -1,
    }
    const [openDialog, setOpenDialog] = useState(nullTeam);

    const handleDeleteClick = () => {
        database.getTeamDAO().deleteTeamByName(team.name);
        onDelete();
    }

    const handleNameEditClick = () => {
        setIsEditingName(true);
        setError('');
        setShowErrorModal(false);
    }

    const handleNameEditBlur = (newName: string) => {
        if (isEditingName && newName.trim() !== '') {
            try {
                const newTeam = database.getTeamDAO().updateTeamByName(team.name, { ...team, name: newName });
                setIsEditingName(false);
                onTeamChange(team.name, newTeam);
            } catch (e) {
                setError('This name already exists');
                setShowErrorModal(true);
            }
        } else if (newName.trim() === ''){
            setError('Team name cannot be empty');
            setShowErrorModal(true);
        }
    }

    const handleCancelNameEdit = () => {
        setIsEditingName(false);
    }

    const setSelectedImage = (character: Character, team: Team, charIndex: number) => {
        const newTeam = { ...team };
        newTeam.characters[charIndex] = character;
        database.getTeamDAO().updateTeamByName(team.name, team);
        onTeamChange(team.name, newTeam);
    }
    return (
        <>
            <Grid container spacing={2} key={team.name}>
                <Grid item container key={team.name} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px', marginBottom: '10px' }}>
                    {isEditingName ? (
                        <>
                            <EditTextField value={team.name} onBlur={handleNameEditBlur} onCancel={handleCancelNameEdit}/>            
                        </>
                    ) : (
                        <>
                            <Typography variant="h4" component="h2">
                                {team.name}
                            </Typography>                           
                            <IconButton aria-label="edit" onClick={() => handleNameEditClick()}>
                                <Edit />
                            </IconButton>
                            <Alert handleDelete={() => handleDeleteClick()}>
                                <IconButton aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </Alert>
                        </>
                    )}
                    <ErrorName showErrorModal={showErrorModal} setShowErrorModal={setShowErrorModal} error={error} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                {[0, 1, 2, 3].map((index) => (
                    <Grid item xs={3} key={index}>
                        <Card>
                            <CardMedia component="img" image={team.characters[index]?.thumbnail || process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="team member" onClick={() => setOpenDialog({ team: team, charIndex: index })} />
                        </Card>
                        {openDialog.team === team && openDialog.charIndex === index && (
                            <Suspense fallback={null}>
                                <CharacterPopup onClose={() => setOpenDialog(nullTeam)} onSelectImage={(pickedChar: Character) => setSelectedImage(pickedChar, team, index)} oldChar={team.characters[index]} />
                            </Suspense>
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default TeamDisplay;
