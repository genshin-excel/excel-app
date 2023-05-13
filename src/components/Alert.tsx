import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertProps {
    children: React.ReactNode;
    handleDelete: () => void;
}

export function Alert({ children, handleDelete }: AlertProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteClick = () => {
        handleDelete();
        setOpen(false);
    };

    return (
        <div>
            {React.cloneElement(children as React.ReactElement, { onClick: handleOpen })}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Alert Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this team? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteClick} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function TextErrorAlert({ errorMessage }: { errorMessage: string }) {
    return (
        <Dialog open={true} onClose={() => { }}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>{errorMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export { };
