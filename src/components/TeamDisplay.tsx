
import React, { useState, useRef, useEffect, lazy } from 'react';
import { Grid, Card, CardMedia, Button, Box, Typography, OutlinedInput, IconButton, Container, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Team } from '../models/Team';
import { Character } from '../models/Character';
import { PickCharacterProps } from '../CharacterPopUp';


const Dialogs = lazy(() => import('../CharacterPopUp'))


function TeamDisplay(team: Team) {
    // const nullTeam: PickCharacterProps = {
    //     team: null,
    //     charIndex: -1,
    // }
    // const [openDialog, setOpenDialog] = useState(nullTeam);
    // const setSelectedImage = (character: Character, team: Team, charIndex: number) => {
    //     const newTeams = teams.map((t) => {
    //         if (t === team) {
    //             t.characters[charIndex] = character;
    //             return { ...t };
    //         }
    //         return t;
    //     });
    //     setTeams(newTeams);
    //     localStorage.setItem('teams', JSON.stringify(newTeams));
    // }

    // return (
    //     <Grid container spacing={2} key={team.name}>
    //                         <Grid item container key={team.name} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    //                             {editingTeam === team ? (
    //                                 <EditTextField value={teamName} editFunc={setTeamName} onBlur={handleBlur} />
    //                             ) : (
    //                                 <>
    //                                     <Typography variant="h4" component="h2">
    //                                         {team.name}
    //                                     </Typography>
    //                                     <IconButton aria-label="delete" onClick={() => handleDeleteClick(team)}>
    //                                         <Delete />
    //                                     </IconButton>
    //                                     <IconButton aria-label="edit" onClick={() => handleEditClick(team)}>
    //                                         <Edit />
    //                                     </IconButton>
    //                                 </>
    //                             )}
    //                         </Grid>
    //                         {[0, 1, 2, 3].map((index) => (
    //                             <Grid item xs={6} sm={3} key={index}>
    //                                 <Card>
    //                                     <CardMedia component="img" image={team.characters[index]?.thumbnail || process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="team member" onClick={() => setOpenDialog({ team: team, charIndex: index })} />
    //                                 </Card>
    //                                 {openDialog.team === team && openDialog.charIndex === index && (
    //                                     <Dialogs onClose={() => setOpenDialog(nullTeam)} onSelectImage={(pickedChar: Character) => setSelectedImage(pickedChar, team, index)} oldChar={team.characters[index]} />
    //                                 )}
    //                             </Grid>
    //                         ))}
    //                     </Grid>
    // );
}
export default TeamDisplay;