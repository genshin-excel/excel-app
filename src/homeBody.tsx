import React, { useState } from 'react';
import { Button, Box, InputLabel, Input, Grid, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { faPen, faCalculator, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { Row } from 'react-bootstrap';


const images = [
    { src: './Images/i1.png', alt: 'Character 1' },
    { src: './Images/i2.png', alt: 'Character 2' },
    { src: 'https://example.com/image3.jpg', alt: 'Character 3' },
    { src: 'https://example.com/image4.jpg', alt: 'Character 4' }
];

function App() {
    const [rows, setRows] = useState<JSX.Element[][]>([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [showImages, setShowImages] = useState(false);
    const [teamCount, setTeamCount] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = () => {
        setShowImages(true);
        setCurrentRow(currentRow => (currentRow + 4) % 4);
        const newRow = Array(4).fill('').map((_, index) => (
            <CustomImage key={index} src="" alt={`Character ${index}`} onClick={() => {
                setSelectedImage(`Images ${index}`);
                setOpen(true);
            }} />
        ));
        const newTeamName = `Team ${teamCount}`;
        setRows(prevRows => [[<h1 style={{ alignSelf: 'center' }}>{newTeamName}</h1>, <BtnIcon />, ...newRow, <InputFields />, <BtnCaculate />], ...prevRows]);
        setTeamCount(prevTeamCount => prevTeamCount + 1);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='App'>
            <Button variant="contained" className="create-team-button" onClick={handleClick}>Create Team</Button>
            <Row>
                <div className="rows-container">
                    {rows.map(row => (
                        <div className='div-row'>
                            {row}
                        </div>
                    ))}
                </div>
            </Row>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{ width: 550 }}>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <div className='search'>
                                <Input id="search-input" value={searchQuery} onChange={handleSearchChange} fullWidth />
                                <Button id="button-addon">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {images.map((image, index) => (
                                    <Grid item key={index}>
                                        <CharImage src={image.src} alt={image.alt} onClick={() => {
                                            setSelectedImage(image.alt);
                                        }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <DialogContentText>
                        {selectedImage}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface Props {
    src: string;
    alt: string;
    onClick?: () => void;
}

function CustomImage({ src = '', alt = '', onClick }: Props) {
    return (
        <Box onClick={onClick} sx={{ width: '150px', border: 'solid', margin: '0 10px' }}>
            <img src={src} alt={alt} className="customImage" />
        </Box>
    );
}

function CharImage({ src = '', alt = '', onClick }: Props) {
    return (
        <Box onClick={onClick} sx={{ width: '150px', height: '150px', border: 'solid', margin: '0 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
                <img src={src} alt={alt} className="customImage" style={{ maxWidth: '100%' }} />
            </div>
        </Box>

    );
}

function InputFields() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <InputLabel className='text' htmlFor="dpr-input">DPR:</InputLabel>
                    <Input id="dpr-input" placeholder="DPR" className='boder' disabled />
                </Grid>
            </Grid>
            <Box mt={2}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <InputLabel className='text' htmlFor="dps-input" >DPS:</InputLabel>
                        <Input id="dps-input" placeholder="DPS" className='boder' disabled />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

function BtnIcon() {
    return (
        <span className='btn-span-icon'>
            <Button className='btn-icon'>
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button className='btn-icon'>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </span>
    )
}

function BtnCaculate() {
    return (
        <div className='btn-div-caculate'>
            <Button href="/teamPage" className='btn-caculate' >
                <FontAwesomeIcon className='btn-fa-ca' icon={faCalculator} />
            </Button>
        </div >
    )
}

export default App;
