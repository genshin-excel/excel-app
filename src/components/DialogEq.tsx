import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

type Props = {
    open: boolean;
    handleClose: () => void;
};

function DialogEq({ open, handleClose }: Props) {
    const handleClickOpen = () => {
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Equipment</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Equipment" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogEq;
