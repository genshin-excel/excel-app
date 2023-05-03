import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
});

const AddNewImages = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justifyContent="center">
                {[...Array(4)].map((_, index) => (
                    <Grid item key={index}>
                        <img
                            src="/images/characters/add_new_4.png"
                            alt={`Add New ${index + 1}`}
                            className={classes.image}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AddNewImages;
