import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  floatingIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 9999, // Ensures the icon appears above other elements
  },
}));

const FloatingIcon = () => {
  const classes = useStyles();

  return (
    <Fab className={classes.floatingIcon} color="primary">
      <Add />
    </Fab>
  );
};

export default FloatingIcon;
