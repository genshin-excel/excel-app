import React, { useState, useMemo } from 'react';
import { Grid, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { charactersMap } from '../database/characters_initData';
import { Character } from '../models/Character';
import { Team } from '../models/Team';
import SearchField from './SearchField';

export type PickCharacterProps = {
    team: Team | null;
    charIndex: number;
};
type Props = {
    onClose: () => void;
    onSelectImage: (pickedChar: Character) => void;
    oldChar: Character | null;
};
  
const CharacterPopup: React.FC<Props> = ({ onClose, onSelectImage, oldChar }) => {
    
    const [searchValue, setSearchValue] = useState('');
    console.log("CharacterPopup searchValue: " + searchValue);

    const filteredCharacters = useMemo(() => {
        if (searchValue === '') {
            return Array.from(charactersMap.values());
        } else {
            const filtered = Array.from(charactersMap.values()).filter((character) =>
                character.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            return filtered;
        }
    }, [searchValue]);

    const handleImageClick = (character: Character) => {
        if (character.id !== oldChar?.id) {
            onSelectImage(character);
        }
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} PaperProps={{
            sx: {
              display: 'flex',
              justifyContent: 'center',
              maxHeight: '80%',
            },
          }}>
            <DialogTitle>Choose character</DialogTitle>
            <DialogContent>
                <SearchField setFinalValueHandler={setSearchValue}/>
                <Grid container spacing={2} justifyContent="start">
                    {filteredCharacters.map((character) => (
                        <Grid item xs={6} sm={4} md={3} key={character.id} sx={{ flexGrow: 1}}>
                            <Card
                                onClick={() => handleImageClick(character)}
                                sx={{
                                    border: oldChar?.id === character.id ? '2px solid #1976d2' : '',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardMedia component="img" image={character.thumbnail} alt={character.name}/>
                            </Card>
                            <Typography component="h2" sx={{textAlign:'center'}}>
                                {character.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CharacterPopup;
