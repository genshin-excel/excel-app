import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { charactersMap } from './database/characters_initData';
import { Character } from './models/Character';
import { debounce } from 'lodash';

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectImage: (imageUrl: string) => void;
};

const Dialogs: React.FC<Props> = ({ open, onClose, onSelectImage }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(Array.from(charactersMap.values()));

    useEffect(() => {
        if (searchValue === '') {
            setFilteredCharacters(Array.from(charactersMap.values()));
        }
    }, [searchValue]);

    const handleSearch = () => {
        if (searchValue === '') {
            setFilteredCharacters(Array.from(charactersMap.values()));
        } else {
            const filtered = Array.from(charactersMap.values()).filter((character) =>
                character.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredCharacters(filtered);
        }
    };

    const handleDebouncedSearch = debounce(() => {
        if (searchValue === null || searchValue === '') {
            setFilteredCharacters(Array.from(charactersMap.values()));
        } else {
            handleSearch();
        }
    }, 10);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if (event.target.value === '') {
            setFilteredCharacters(Array.from(charactersMap.values()));
        } else {
            handleDebouncedSearch();
        }
    };

    const handleImageClick = (character: Character) => {
        if (character.id !== selectedCharacterId) {
            setSelectedCharacterId(character.id);
            onSelectImage(character.thumbnail);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Choose character</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleSearch}>
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
                                    border: selectedCharacterId === character.id ? '2px solid #1976d2' : '',
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
