import React, { useState, useRef, useEffect, Suspense } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Divider,
  InputAdornment,
  styled,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WeaponPopup from "./WeponPopUp";
import CharacterPopup from "./CharacterPopUp";
import { Character } from "../models/Character";
import { Weapon } from "../models/Weapon";
import { Artifact } from "../models/Artifacts";
import ArtifactPopup from "./ArtifactsPopUp";
import CharacterConfigCard from "./CharacterConfigCard";

const CustomTextField = styled(TextField)`
  & .MuiFilledInput-root {
    background-color: #f5f5f5;
  }
  & .MuiFilledInput-root:hover {
    background-color: #f5f5f5;
  }
  & .MuiFilledInput-root.Mui-readOnly {
    background-color: #ffd70075;
  }
  & .MuiFilledInput-root.Mui-focused:not(.Mui-readOnly) {
    background-color: #e0e0e0;
  }
`;

const RowName = styled(Typography)(({ theme }) => ({
  paddingBottom: "7px",
  textAlign: "right",
}));

export default function CharacterConfig() {
  console.log("CharacterConfig");
  document.title = "CharacterConfig";

  let characterConfigs = [
    ["Ascension", 0, 0, 6],
    ["Level", 1, 1, 90],
    ["Constellation", 0, 0, 6],
  ].map((item) => ({
    name: String(item[0]),
    value: Number(item[1]),
    min: Number(item[2]),
    max: Number(item[3]),
  }));

  let weaponConfigs = [
    ["Refinement", 0, 1, 5],
    ["Ascension", 0, 0, 6],
    ["Level", 0, 1, 90],
  ].map((item) => ({
    name: String(item[0]),
    value: Number(item[1]),
    min: Number(item[2]),
    max: Number(item[3]),
  }));

  // const weaponConfigs = ["Refine", "Ascens", "Level"];
  const setUp = ["Attack", "Skill", "Burst"];

  const [checked, setChecked] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // const [valuesChar, setValuesChar] = useState(
  //   Array(characterConfigs.length).fill(0)
  // );
  const [valuesWeapon, setValuesWeapon] = useState(
    Array(weaponConfigs.length).fill(0)
  );
  const [values, setValues] = useState(Array(weaponConfigs.length).fill(0));
  const [stats, setStats] = React.useState("");
  const [number, setNumber] = useState(0);
  const [openChar, setOpenChar] = useState(false);
  const [openWeapon, setOpenWeapon] = useState(false);
  const [openArtifact, setOpenArtifact] = useState(false);

  const [character, setCharacter] = useState<Character>({
    id: "",
    name: "",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/add_new_4.png",
  });
  const [weapon, setWeapon] = useState<Weapon>({
    id: "",
    name: "",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/add_new_4.png",
  });

  const [artifactSets, setArtifactSets] = useState<
    { name: string; image: string }[]
  >([]);

  const handleArtifactImageSelection = (pickedArtifact: Artifact) => {
    if (artifactSets.length < 3) {
      setArtifactSets([
        ...artifactSets,
        { name: pickedArtifact.name, image: pickedArtifact.thumbnail },
      ]);
    }
  };

  const handleCloseWeapon = () => {
    setOpenWeapon(false);
  };

  // const handleChangeCharacter = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const newValues = [...valuesChar];
  //   newValues[index] = Number(event.target.value);
  //   setValuesChar(newValues);
  // };

  const handleChangeWeapon = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...valuesWeapon];
    newValues[index] = Number(event.target.value);
    setValuesWeapon(newValues);
  };

  const handleChangeSetUp = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...values];
    newValues[index] = Number(event.target.value);
    setValues(newValues);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange = () => {
    setNumber(number + 1);
    setShowStats(true);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const handleChangeStats = (event: SelectChangeEvent) => {
    setStats(event.target.value);
  };

  let substats = [
    ["HP%", 0.198, "%"],
    ["HP", 299, "+"],
    ["ATK%", 0.2777, "%"],
    ["ATK", 38, "+"],
    ["DEF%", 0.365, "%"],
    ["DEF", 80, "+"],
    ["EM", 187, "+"],
    ["ER", 0.456, "%"],
    ["CR", 0.311, "%"],
    ["CD", 0.622, "%"],
  ].map((item) => ({
    name: String(item[0]),
    value: Number(item[1]),
    type: String(item[2]),
  }));
  let finalStats = [
    ["ATK", 0, "+"],
    ["EM", 0, "+"],
    ["HP", 0, "+"],
    ["DEF", 0, "+"],
    ["CRIT", 0, "%"],
    ["CRIT DMG", 0, "%"],
    ["ELE DMG", 0, "+"],
    ["PHY DMG", 0, "%"],
    ["ER", 0, "%"],
    ["HEALING", 0, "%"],
  ].map((stats) => ({
    name: String(stats[0]),
    value: Number(stats[1]),
    type: String(stats[2]),
  }));

  let talents = [
    ["Normal ATK", 0, 1, 15],
    ["Skill", 0, 1, 15],
    ["Burst", 0, 1, 15],
  ].map((stats) => ({
    name: String(stats[0]),
    value: Number(stats[1]),
    min: Number(stats[2]),
    max: Number(stats[3]),
  }));

  let artifactMainStats = [
    { name: "Sands", values: ["HP%", "ATK%", "DEF%", "EM", "ER%"] },
    {
      name: "Goblet",
      values: ["HP%", "ATK%", "DEF%", "EM", "ELE DMG%", "PHY DMG%"],
    },
    {
      name: "Circlet",
      values: [
        "HP%",
        "ATK%",
        "DEF%",
        "ELE",
        "CRIT RATE%",
        "CRIT DMG%",
        "HEALING",
      ],
    },
  ];

  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={2} maxWidth="xl">
        {/*---------------------Character------------------------------ */}
        <Grid item xs={12} sm={6} md={6}>
          <CharacterConfigCard title="Character">
            <Grid item xs={12} md={3}>
              <Grid item>
                <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                  <CardMedia
                    component="img"
                    image={character.thumbnail}
                    alt="character"
                  />
                </Card>
              </Grid>
              <Grid item mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  onClick={() => setOpenChar(true)}
                >
                  Change
                </Button>
                <Suspense fallback={null}>
                  {openChar && (
                    <CharacterPopup
                      onClose={() => setOpenChar(false)}
                      onSelectImage={(pickedChar: Character) =>
                        setCharacter(pickedChar)
                      }
                      oldChar={character}
                    />
                  )}
                </Suspense>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9} container rowSpacing={1}>
              {characterConfigs.map((item, index) => (
                <Grid
                  key={index}
                  item
                  container
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  pl={2}
                  xs={12}
                >
                  <Grid item xs={6}>
                    <RowName>{item.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      type="number"
                      defaultValue={item.value}
                      // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      //   handleChangeCharacter(event, index)
                      // }
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                      sx={{ pl: 2 }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Weapon------------------------------ */}
        <Grid item xs={12} sm={6} md={6}>
          <CharacterConfigCard title="Weapon">
            <Grid item md={3}>
              <Grid item>
                <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                  <CardMedia
                    component="img"
                    image={weapon.thumbnail}
                    alt="weapon"
                  />
                </Card>
              </Grid>
              <Grid item mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  onClick={() => setOpenWeapon(true)}
                >
                  Change
                </Button>
                <Suspense fallback={null}>
                  {openWeapon && (
                    <WeaponPopup
                      onClose={handleCloseWeapon}
                      onSelectImage={(pickedWeapon: Weapon) =>
                        setWeapon(pickedWeapon)
                      }
                      oldWeapon={weapon}
                    />
                  )}
                </Suspense>
              </Grid>
            </Grid>
            <Grid
              item
              md={9}
              container
              justifyContent="flex-end"
              rowSpacing={1}
            >
              {weaponConfigs.map((item, index) => (
                <Grid
                  key={index}
                  item
                  display="flex"
                  alignItems="flex-end"
                  pl={2}
                  xs={12}
                >
                  <Grid item xs={6}>
                    <RowName>{item.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      fullWidth
                      variant="filled"
                      type="number"
                      defaultValue={item.value}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                      sx={{ pl: 2 }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Artifact Set------------------------------ */}
        <Grid item xs={12} sm={6} md={4}>
          {/* {artifactImages.map((artifactImage, index) => ( */}
          <CharacterConfigCard title="Artifact Set">
            <Grid item container xs={12} rowSpacing={1} columnSpacing={1}>
              {artifactSets.map((artifactSet, index) => (
                <Grid item container sm={12} md={6} key={index}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <Grid item xs={4} md={12} lg={4} p={1} key={index}>
                      <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                        <CardMedia
                          component="img"
                          image={artifactSet.image}
                          alt="artifact"
                        />
                      </Card>
                    </Grid>

                    <Grid item container xs={8} md={12} lg={8}>
                      <Grid item xs={12} pl={1}>
                        <Typography> {artifactSet.name} </Typography>
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        xs={5}
                      >
                        <Checkbox
                          checked={checked}
                          onChange={handleCheckBoxChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <Typography textAlign="center">2</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Checkbox
                          checked={checked}
                          onChange={handleCheckBoxChange}
                          inputProps={{ "aria-label": "controlled" }}
                          size="small"
                        />

                        <Typography textAlign="center">4</Typography>
                      </Grid>
                      <Grid item display="flex" alignItems="center" xs={2}>
                        <DeleteIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item md={12} textAlign="center">
              <Button
                disabled={artifactSets.length >= 3}
                variant="contained"
                color="primary"
                onClick={() => setOpenArtifact(true)}
                sx={{ width: "100%" }}
              >
                Add New Set
              </Button>
              <Suspense fallback={null}>
                {openArtifact && (
                  <ArtifactPopup
                    onClose={() => setOpenArtifact(false)}
                    onSelectImage={(pickedArtifact: Artifact) =>
                      handleArtifactImageSelection(pickedArtifact)
                    }
                    oldArtifact={null}
                  />
                )}
              </Suspense>
            </Grid>
          </CharacterConfigCard>
          {/* ))} */}
        </Grid>

        {/*---------------------Talents------------------------------ */}
        <Grid item xs={12} sm={6} md={4}>
          <CharacterConfigCard title="Talents">
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              rowSpacing={1}
            >
              {talents.map((item, index) => (
                <Grid
                  key={index}
                  item
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  xs={12}
                >
                  <Grid item xs={6}>
                    <RowName>{item.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      fullWidth
                      variant="filled"
                      type="number"
                      value={values[index]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeSetUp(event, index)
                      }
                      sx={{ pl: 2 }}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Artifact Main Stats------------------------------ */}
        <Grid item xs={12} sm={6} md={4}>
          <CharacterConfigCard title="Artifact Main Stats">
            <Grid item md={12} container rowSpacing={1}>
              {artifactMainStats.map((stats, index) => (
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  key={index}
                >
                  <Grid item xs={6}>
                    <RowName>{stats.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      select
                      defaultValue={stats.values[0]}
                      sx={{
                        pl: 2,
                        // textAlign: 'center',
                        // '& .MuiInputBase-input': {
                        //   textAlign: 'center',
                        //   pandingBottom:'32px'
                        // },
                      }}
                    >
                      {stats.values.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="small-label">stats</InputLabel>
                    <Select
                      labelId="small-label"
                      id="select-small"
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
                  </FormControl> */}
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Substats------------------------------ */}
        <Grid item xs={12} md={4}>
          <CharacterConfigCard title="Sub stats">
            <Grid item container rowSpacing={1}>
              {substats.map((item, index) => (
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  key={index}
                  pl={2}
                >
                  <Grid item xs={6}>
                    <RowName>{item.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    {item.type === "%" && (
                      <CustomTextField
                        fullWidth
                        variant="filled"
                        id="outlined-basic"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                        defaultValue={(item.value * 100).toFixed(2)}
                        sx={{ pl: 2 }}
                      />
                    )}
                    {item.type === "+" && (
                      <CustomTextField
                        variant="filled"
                        fullWidth
                        id="outlined-basic"
                        defaultValue={item.value.toFixed(2)}
                        type="number"
                        sx={{ pl: 2 }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Final Character Stats------------------------------ */}
        <Grid item xs={12} md={4}>
          <CharacterConfigCard title="Final Character Stats">
            <Grid item container rowSpacing={1}>
              {finalStats.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  key={index}
                >
                  <Grid item xs={6}>
                    <RowName>{item.name}</RowName>
                  </Grid>
                  <Grid item xs={6}>
                    {item.type === "%" && (
                      <CustomTextField
                        fullWidth
                        variant="filled"
                        id="outlined-basic"
                        type="number"
                        InputProps={{
                          readOnly: true,
                          tabIndex: -1,
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                        defaultValue={(item.value * 100).toFixed(2)}
                        sx={{ pl: 2 }}
                      />
                    )}
                    {item.type === "+" && (
                      <CustomTextField
                        fullWidth
                        variant="filled"
                        id="outlined-basic"
                        defaultValue={item.value.toFixed(2)}
                        sx={{ pl: 2 }}
                        InputProps={{
                          readOnly: true,
                          tabIndex: -1,
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CharacterConfigCard>
        </Grid>

        {/*---------------------Stats Bonus------------------------------ */}
        <Grid item xs={12} md={4}>
          <CharacterConfigCard title="Stats Bonus">
            <Grid item container rowSpacing={1}>
              {showStats &&
                Array.from({ length: number }).map((_, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    key={index}
                  >
                    <RowName>Title</RowName>
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
                    <DeleteIcon sx={{ ml: 2, color: "red" }} />
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleChange}
                sx={{ width: "100%" }}
              >
                Add Stats
              </Button>
            </Grid>
          </CharacterConfigCard>
        </Grid>
      </Grid>
    </>
  );
}
