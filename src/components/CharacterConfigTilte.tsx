import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';

function CharacterConfigTitle({ title }: { title: string }) {
    return (
        <>
            <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Divider />
            </Grid>
        </>
    );
};

export default CharacterConfigTitle;
