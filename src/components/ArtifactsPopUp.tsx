import React, { useState, useMemo } from 'react';
import { Grid, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import SearchField from './SearchField';
import { artifactsMap } from '../database/Artifacts_initData';
import { Artifact } from '../models/Artifacts';
import { Team } from '../models/Team';

export type PickArtifactProps = {
    team: Team | null;
    artifactIndex: number;
};
type Props = {
    onClose: () => void;
    onSelectImage: (pickedArtifact: Artifact) => void;
    oldArtifact: Artifact | null;
};

const ArtifactPopup: React.FC<Props> = ({ onClose, onSelectImage, oldArtifact }) => {

    const [searchValue, setSearchValue] = useState('');
    console.log("ArtifactPopup searchValue: " + searchValue);

    const filteredArtifacts = useMemo(() => {
        if (searchValue === '') {
            return Array.from(artifactsMap.values());
        } else {
            const filtered = Array.from(artifactsMap.values()).filter((artifact) =>
                artifact.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            return filtered;
        }
    }, [searchValue]);

    const handleImageClick = (artifact: Artifact) => {
        if (artifact.id !== oldArtifact?.id) {
            onSelectImage(artifact);
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
            <DialogTitle>Choose Artifact</DialogTitle>
            <DialogContent>
                <SearchField setFinalValueHandler={setSearchValue} />
                <Grid container spacing={2} justifyContent="start">
                    {filteredArtifacts.map((artifact) => (
                        <Grid item xs={6} sm={4} md={3} key={artifact.id} sx={{ flexGrow: 1 }}>
                            <Card
                                onClick={() => handleImageClick(artifact)}
                                sx={{
                                    border: oldArtifact?.id === artifact.id ? '2px solid #1976d2' : '',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardMedia component="img" image={artifact.thumbnail} alt={artifact.name} />
                            </Card>
                            <Typography component="h2" sx={{ textAlign: 'center' }}>
                                {artifact.name}
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

export default ArtifactPopup;
