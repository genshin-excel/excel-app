import React, { useState, useMemo } from 'react';
import { Grid, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Weapon } from '../models/Weapon';
import { Team } from '../models/Team';
import SearchField from './SearchField';
import { weaponsMap } from '../database/weapons_initData';

export type PickWeaponProps = {
    team: Team | null;
    weaponIndex: number;
};
type Props = {
    onClose: () => void;
    onSelectImage: (pickedWeapon: Weapon) => void;
    oldWeapon: Weapon | null;
};

const WeaponPopup: React.FC<Props> = ({ onClose, onSelectImage, oldWeapon }) => {

    const [searchValue, setSearchValue] = useState('');
    console.log("WeaponPopup searchValue: " + searchValue);

    const filteredWeapons = useMemo(() => {
        if (searchValue === '') {
            return Array.from(weaponsMap.values());
        } else {
            const filtered = Array.from(weaponsMap.values()).filter((weapon) =>
                weapon.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            return filtered;
        }
    }, [searchValue]);

    const handleImageClick = (weapon: Weapon) => {
        if (weapon.id !== oldWeapon?.id) {
            onSelectImage(weapon);
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
            <DialogTitle>Choose Weapon</DialogTitle>
            <DialogContent>
                <SearchField setFinalValueHandler={setSearchValue} />
                <Grid container spacing={2} justifyContent="start">
                    {filteredWeapons.map((weapon) => (
                        <Grid item xs={6} sm={4} md={3} key={weapon.id} sx={{ flexGrow: 1 }}>
                            <Card
                                onClick={() => handleImageClick(weapon)}
                                sx={{
                                    border: oldWeapon?.id === weapon.id ? '2px solid #1976d2' : '',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardMedia component="img" image={weapon.thumbnail} alt={weapon.name} />
                            </Card>
                            <Typography component="h2" sx={{ textAlign: 'center' }}>
                                {weapon.name}
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

export default WeaponPopup;
