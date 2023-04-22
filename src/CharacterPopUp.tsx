import React, { useState } from 'react';
import { Grid, Card, CardMedia, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { charactersMap } from './database/characters_initData';

type Props = {
    open: boolean;
    onClose: () => void;
};

const Dialogs: React.FC<Props> = ({ open, onClose }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        console.log('Search value:', searchValue);
    };

    const characters = Array.from(charactersMap.values());

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dialog Title</DialogTitle>
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
                    {characters.map((character) => (
                        <Grid item xs={6} sm={4} md={3} key={character.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={character.thumbnail}
                                    alt={character.name}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onClose}>Ok</button>
            </DialogActions>
        </Dialog>
    );
};

export default Dialogs;
