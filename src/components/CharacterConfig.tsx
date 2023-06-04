import React, { useState, useRef, useEffect } from "react";
import { Grid, Card, CardMedia, Typography, TextField, Button, Checkbox, Paper, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const ScrollablePaper = styled(Paper)(({ theme }) => ({
    maxHeight: 280,
    overflow: 'auto',
}));

const ScrollablePaperStats = styled(Paper)(({ theme }) => ({
    maxHeight: 580,
    overflow: 'auto',
}));

export default function CharacterConfig() {
    console.log("CharacterConfig");
    document.title = "CharacterConfig";

    const character = ["Ascens", "Level", "Cons"];
    const weapon = ["Refine", "Ascens", "Level"];
    const setUp = ["Attack", "Skill", "Burst"];
    const [checked, setChecked] = React.useState(true);
    const [numSets, setNumSets] = useState(0);
    const [showSets, setShowSets] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [valuesChar, setValuesChar] = useState(Array(character.length).fill(0));
    const [valuesWeapon, setValuesWeapon] = useState(Array(weapon.length).fill(0));
    const [values, setValues] = useState(Array(weapon.length).fill(0));
    const [stats, setStats] = React.useState('');
    const [number, setNumber] = useState(0);

    const handleChangeCharacter = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...valuesChar];
        newValues[index] = Number(event.target.value);
        setValuesChar(newValues);
    };

    const handleChangeWeapon = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...valuesChar];
        newValues[index] = Number(event.target.value);
        setValuesWeapon(newValues);
    };

    const handleChangeSetUp = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...valuesChar];
        newValues[index] = Number(event.target.value);
        setValues(newValues);
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleAddSet = () => {
        setNumSets(numSets + 1);
        setShowSets(true);
    };

    const handleChange = () => {
        setNumber(number + 1);
        setShowStats(true);
    };

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [numSets]);

    const handleChangeStats = (event: SelectChangeEvent) => {
        setStats(event.target.value);
    };

    let statsAftifact = ["HP%", "HP", "ATK%", "ATk", "DEF%", "DEF", "EM", "ER", "CR", "CD"].map(info => ({ info }));
    let otherStats = ["ATK", "EM", "HP", "DEF", "CRIT", "CRIT DMG", "ELE DMG", "PHY DMG", "ER", "HEALING"].map(info => ({ info }));

    return (
        <>
            <Grid container maxWidth='xl'>

                <Grid item xs={12} sm={6} md={4} border={1}>
                    <Grid item md={12}>
                        <Typography> Character </Typography>
                    </Grid>
                    <Grid display='flex' width='100%' >
                        <Grid item md={6} justifyContent="center" >
                            <Grid item>
                                <Card sx={{ maxWidth: '100%', maxHeight: '100%' }}>
                                    <CardMedia component="img" image={process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="character" />
                                </Card>
                            </Grid>
                            {[0].map((index) => (
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: "100%" }}
                                    >
                                        Change Character
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item md={6} container justifyContent='flex-end'>
                            {character.map((label, index) => (
                                <Grid
                                    key={index}
                                    item
                                    display='flex'
                                    alignItems='center'
                                    pr={4}
                                >
                                    <Typography>{label}</Typography>
                                    <TextField
                                        type="number"
                                        value={valuesChar[index]}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeCharacter(event, index)}
                                        sx={{ marginLeft: "10px" }}
                                        inputProps={{
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4} border={1} >
                    <Grid item md={12}>
                        <Typography> Weapon </Typography>
                    </Grid>
                    <Grid display='flex' width='100%' >
                        <Grid item md={6} justifyContent="center" >
                            <Grid item >
                                <Card sx={{ maxWidth: '100%', maxHeight: '100%' }}>
                                    <CardMedia component="img" image={process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="character" />
                                </Card>
                            </Grid>
                            <Grid item >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                >
                                    Change Weapon
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item md={6} container justifyContent='flex-end'>
                            {weapon.map((label, index) => (
                                <Grid
                                    key={index}
                                    item
                                    display='flex'
                                    alignItems='center'
                                    pr={4}
                                >
                                    <Typography>{label}</Typography>
                                    <TextField
                                        type="number"
                                        value={valuesWeapon[index]}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeWeapon(event, index)}
                                        sx={{ marginLeft: "10px" }}
                                        inputProps={{
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4} maxHeight='100%' border={1}>
                    <Grid item md={12}>
                        <Typography> Set Bonus </Typography>
                    </Grid>
                    <ScrollablePaper ref={scrollContainerRef}>
                        {showSets &&
                            Array.from({ length: numSets }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <Grid item md={12} display='flex' alignItems='center' justifyContent='center' p={2}>
                                        <Card sx={{ maxWidth: '20%', maxHeight: '20%', mr: 2 }}>
                                            <CardMedia component="img" image={process.env.PUBLIC_URL + '/images/characters/add_new_4.png'} alt="character" />
                                        </Card>
                                        <Typography>Set Bonus</Typography>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheckBoxChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Typography>2</Typography>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheckBoxChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Typography>4</Typography>
                                        <DeleteIcon sx={{ ml: 2, color: 'red' }} />
                                    </Grid>
                                </React.Fragment>
                            ))}
                        <Grid item md={12} textAlign='center' >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddSet}
                                sx={{ width: "80%" }}
                            >
                                Add Set Bonus
                            </Button>
                        </Grid>
                    </ScrollablePaper>
                </Grid>

                <Grid item container xs={12} sm={6} md={12}  >
                    <Grid item xs={12} sm={6} md={6} border={1}>
                        <Grid item md={12}>
                            <Typography> Set Up </Typography>
                        </Grid>
                        {setUp.map((label, index) => (
                            <Grid
                                key={index}
                                item
                                display='flex'
                                alignItems='center'
                                justifyContent='flex-end'
                                pr={4}
                            >
                                <Typography>{label}</Typography>
                                <TextField
                                    type="number"
                                    value={values[index]}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeSetUp(event, index)}
                                    sx={{ marginLeft: "10px" }}
                                    inputProps={{
                                        min: 0,
                                        max: 100,
                                        step: 1,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} border={1}>
                        <Grid item md={12}>
                            <Typography> Artifact</Typography>
                        </Grid>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Grid item md={12} display='flex' alignItems='center' justifyContent='flex-end' key={index}>
                                <Typography>Goblet</Typography>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">stats</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={stats}
                                        label="Age"
                                        onChange={handleChangeStats}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>HP</MenuItem>
                                        <MenuItem value={20}>HP%</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>

                </Grid>

                <Grid item container xs={12} sm={6} md={12}>

                    <Grid item md={4} border={1}>
                        <Grid item md={12}>
                            <Typography> Sub stats </Typography>
                        </Grid>
                        {statsAftifact.map((item, index) => (
                            <Grid item md={12} display='flex' alignItems='center' justifyContent='flex-end' key={index}>
                                <Typography>{item.info}</Typography>
                                <TextField id="outlined-basic" defaultValue="0" sx={{ pl: 2 }} />
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item md={4} border={1} >
                        <Grid item md={12}>
                            <Typography> Stats </Typography>
                        </Grid>
                        {otherStats.map((item, index) => (
                            <Grid item md={12} display='flex' alignItems='center' justifyContent='flex-end' key={index}>
                                <Typography>{item.info}</Typography>
                                <TextField id="outlined-basic" defaultValue="0" sx={{ pl: 2 }} />
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item md={4} border={1}>
                        <Grid item md={12}>
                            <Typography> Add stats </Typography>
                        </Grid>
                        <ScrollablePaperStats ref={scrollContainerRef}>
                            {showStats &&
                                Array.from({ length: number }).map((_, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item md={12} display='flex' alignItems='center' justifyContent='center' p={2}>

                                            <Typography>Title</Typography>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                <InputLabel id="demo-select-small-label">ATK</InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    label="ATK"
                                                    onChange={handleChangeStats}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>100</MenuItem>
                                                    <MenuItem value={2}>200</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Typography>200</Typography>
                                            <DeleteIcon sx={{ ml: 2, color: 'red' }} />
                                        </Grid>
                                    </React.Fragment>
                                ))}

                            <Grid item md={12} textAlign='center'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleChange}
                                    sx={{ width: "80%" }}
                                >
                                    Add Stats
                                </Button>
                            </Grid>
                        </ScrollablePaperStats>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}