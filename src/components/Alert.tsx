import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography, Button, Modal } from '@mui/material';

interface AlertProps {
    children: React.ReactNode;
    handleDelete: () => void;
}

interface ErrorNameProps {
    showErrorModal: boolean;
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
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

export function ErrorName({ showErrorModal, setShowErrorModal, error }: ErrorNameProps) {
    return (
        <Modal
            open={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    Error
                </Typography>
                <Typography color="error">{error}</Typography>
                <Button onClick={() => setShowErrorModal(false)}>Close</Button>
            </Box>
        </Modal>
    );
}

export { };
