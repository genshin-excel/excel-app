import React, { useState, useDeferredValue, useMemo } from 'react';
import { Grid, Card, CardMedia, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { charactersMap } from '../database/characters_initData';
import { Character } from '../models/Character';
import { Team } from '../models/Team';

export type PickCharacterProps = {
    team: Team | null;
    charIndex: number;
};
type Props = {
    onClose: () => void;
    onSelectImage: (pickedChar: Character) => void;
    oldChar: Character | null;
};
  
const Dialogs: React.FC<Props> = ({ onClose, onSelectImage, oldChar }) => {
    
    const [searchValue, setSearchValue] = useState('');
    const deferredQuery = useDeferredValue(searchValue);

    const filteredCharacters = useMemo(() => {
        if (deferredQuery === '') {
            return Array.from(charactersMap.values());
        } else {
            const filtered = Array.from(charactersMap.values()).filter((character) =>
                character.name.toLowerCase().includes(deferredQuery.valueOf().toLowerCase())
            );
            return filtered;
        }
    }, [deferredQuery]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    };

    const handleImageClick = (character: Character) => {
        if (character.id !== oldChar?.id) {
            onSelectImage(character);
        }
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true}>
            <DialogTitle>Choose character</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton disabled>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ marginBottom: '16px', marginTop: '6px' }}
                />
                <Grid container spacing={2} justifyContent="start">
                    {filteredCharacters.map((character) => (
                        <Grid item sm={6} md={4} lg={3} key={character.id} sx={{ flexGrow: 1 }}>
                            <Card
                                onClick={() => handleImageClick(character)}
                                sx={{
                                    border: oldChar?.id === character.id ? '2px solid #1976d2' : '',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardMedia component="img" image={character.thumbnail} alt={character.name} />
                            </Card>
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

export default Dialogs;
