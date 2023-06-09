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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import CharacterConfigTitle from "./CharacterConfigTilte";
import WeaponPopup from "./WeponPopUp";
import CharacterPopup from "./CharacterPopUp";
import { Character } from "../models/Character";
import { Weapon } from "../models/Weapon";
import { Artifact } from "../models/Artifacts";
import ArtifactPopup from "./ArtifactsPopUp";

const ConfigCard = styled(Grid)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  padding: "8px",
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
  const [stats, setStats] = React.useState("");
  const [number, setNumber] = useState(0);
  const [openChar, setOpenChar] = useState(false);
  const [openWeapon, setOpenWeapon] = useState(false);
  const [openArtifact, setOpenArtifact] = useState(false);

  const [charImages, setCharImages] = useState<string[]>([process.env.PUBLIC_URL + '/images/characters/add_new_4.png']);
  const [weaponImages, setWeaponImages] = useState<string[]>([process.env.PUBLIC_URL + '/images/characters/add_new_4.png']);

  const [artifactImages, setArtifactImages] = useState<{ id: number; image: string }[]>([
    { id: 0, image: process.env.PUBLIC_URL + '/images/characters/add_new_4.png' }
  ]);

  const handleArtifactImageSelection = (pickedArtifact: Artifact, index: number) => {
    const newArtifactImages = [...artifactImages];
    newArtifactImages[index] = {
      id: parseInt(pickedArtifact.id),
      image: pickedArtifact.thumbnail,
    };
    setArtifactImages(newArtifactImages);
  };

  const handleCloseChar = () => {
    setOpenChar(false);
  };

  const handleCloseWeapon = () => {
    setOpenWeapon(false);
  };

  const handleCloseArtifact = () => {
    setOpenArtifact(false);
  };

  const handleChangeCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...valuesChar];
    newValues[index] = Number(event.target.value);
    setValuesChar(newValues);
  };

  const handleButtonCharClick = (index: number) => {
    setOpenChar(true);
  };

  const handleButtonWeaponClick = (index: number) => {
    setOpenWeapon(true);
  };

  const handleImageArtifactClick = (index: number) => {
    setOpenArtifact(true);
  };

  const handleChangeWeapon = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...valuesChar];
    newValues[index] = Number(event.target.value);
    setValuesWeapon(newValues);
  };

  const handleChangeSetUp = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...valuesChar];
    newValues[index] = Number(event.target.value);
    setValues(newValues);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleAddSet = () => {
    if (numSets < 3) {
      setNumSets(numSets + 1);
      setShowSets(true);
    }
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

  useEffect(() => {
    scrollToBottom();
  }, [numSets]);

  const handleChangeStats = (event: SelectChangeEvent) => {
    setStats(event.target.value);
  };

  let statsAftifact = [
    "HP%",
    "HP",
    "ATK%",
    "ATk",
    "DEF%",
    "DEF",
    "EM",
    "ER",
    "CR",
    "CD",
  ].map((info) => ({ info }));
  let otherStats = [
    "ATK",
    "EM",
    "HP",
    "DEF",
    "CRIT",
    "CRIT DMG",
    "ELE DMG",
    "PHY DMG",
    "ER",
    "HEALING",
  ].map((info) => ({ info }));

  const handleCharImageSelection = (pickedChar: Character, index: number) => {
    const newCharacterImages = [...charImages];
    newCharacterImages[index] = pickedChar.thumbnail;
    setCharImages(newCharacterImages);
  };

  const handleWeaponImageSelection = (pickedWeapon: Weapon, index: number) => {
    const newWeaponImages = [...weaponImages];
    newWeaponImages[index] = pickedWeapon.thumbnail;
    setWeaponImages(newWeaponImages);
  };

  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={2} maxWidth="xl">
        <Grid item xs={12} sm={6} md={6}>
          <ConfigCard container rowSpacing={1} justifyContent='center'>
            <CharacterConfigTitle title="Character" />
            {charImages.map((image, index) => (
              <Grid item md={3} key={index}>
                <Grid item>
                  <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                    <CardMedia
                      component="img"
                      image={image}
                      alt="character"
                    />
                  </Card>
                </Grid>
                <Grid item mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleButtonCharClick(index)}
                  >
                    Change
                  </Button>
                  <Suspense fallback={null}>
                    {openChar && (
                      <CharacterPopup
                        onClose={handleCloseChar}
                        onSelectImage={(pickedChar: Character) =>
                          handleCharImageSelection(pickedChar, index)
                        }
                        oldChar={null}
                      />
                    )}
                  </Suspense>
                </Grid>
              </Grid>
            ))}
            <Grid item md={9} container justifyContent="flex-end" rowSpacing={1}>
              {character.map((label, index) => (
                <Grid
                  key={index}
                  item
                  display="flex"
                  alignItems="center"
                  pl={2}
                  md={4}
                >
                  <Typography>{label}</Typography>
                  <TextField
                    type="number"
                    value={valuesChar[index]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeCharacter(event, index)
                    }
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
          </ConfigCard>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <ConfigCard container rowSpacing={1} justifyContent='center'>
            <CharacterConfigTitle title="Weapon" />
            {weaponImages.map((image, index) => (
              <Grid item md={3} key={index}>
                <Grid item>
                  <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                    <CardMedia
                      component="img"
                      image={image}
                      alt="weapon"
                    />
                  </Card>
                </Grid>
                <Grid item mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                    onClick={() => handleButtonWeaponClick(index)}
                  >
                    Change
                  </Button>
                  <Suspense fallback={null}>
                    {openWeapon && (
                      <WeaponPopup
                        onClose={handleCloseWeapon}
                        onSelectImage={(pickedWeapon: Weapon) =>
                          handleWeaponImageSelection(pickedWeapon, index)
                        }
                        oldWeapon={null}
                      />
                    )}
                  </Suspense>
                </Grid>
              </Grid>
            ))}
            <Grid item md={9} container justifyContent="flex-end" rowSpacing={1}>
              {weapon.map((label, index) => (
                <Grid
                  key={index}
                  item
                  display="flex"
                  alignItems="center"
                  pl={2}
                  md={4}
                >
                  <Typography>{label}</Typography>
                  <TextField
                    type="number"
                    value={valuesWeapon[index]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeWeapon(event, index)
                    }
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
          </ConfigCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ConfigCard container rowSpacing={1}>
            <CharacterConfigTitle title="Set Bonus" />
            <Grid item container xs={12} rowSpacing={1} columnSpacing={1}>
              {showSets &&
                Array.from({ length: numSets }).map((_, index) => (
                  <Grid item container sm={12} md={6}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: "#f5f5f5" }}
                      key={index}
                    >
                      {artifactImages.map((artifactImage, index) => (
                        <Grid item xs={4} md={12} lg={4} p={1} key={index}>
                          <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                            <CardMedia
                              component="img"
                              image={artifactImage.image}
                              alt="artifact"
                              onClick={() => handleImageArtifactClick(index)}
                            />
                          </Card>
                          <Suspense fallback={null}>
                            {openArtifact && (
                              <ArtifactPopup
                                onClose={handleCloseArtifact}
                                onSelectImage={(pickedArtifact: Artifact) =>
                                  handleArtifactImageSelection(pickedArtifact, index)
                                }
                                oldArtifact={null}
                              />
                            )}
                          </Suspense>
                        </Grid>
                      ))}

                      <Grid item container xs={8} md={12} lg={8}>
                        <Grid item xs={12} pl={1}>
                          <Typography> Set abc {index + 1} </Typography>
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
                disabled={numSets >= 3}
                variant="contained"
                color="primary"
                onClick={handleAddSet}
                sx={{ width: "100%" }}
              >
                Add Set Bonus
              </Button>
            </Grid>
          </ConfigCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ConfigCard item container md={12} rowSpacing={1}>
            <CharacterConfigTitle title="Set Up" />
            <Grid item md={12} container justifyContent='flex-end' rowSpacing={1}>
              {setUp.map((label, index) => (
                <Grid
                  key={index}
                  item
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  sm={12}
                  md={12}
                  xl={12}
                >
                  <Typography>{label}</Typography>
                  <TextField
                    type="number"
                    value={values[index]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeSetUp(event, index)
                    }
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
          </ConfigCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ConfigCard container rowSpacing={1}>
            <CharacterConfigTitle title="Artifact" />
            <Grid item md={12} container>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid
                  item
                  xs={12}
                  md={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  key={index}
                >
                  <Typography>Goblet</Typography>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </ConfigCard>
        </Grid>
        {/*---------------------row 3------------------------------ */}
        <Grid item md={4}>
          <ConfigCard container rowSpacing={1}>
            <CharacterConfigTitle title="Sub stats" />
            <Grid item container rowSpacing={1}>
              {statsAftifact.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  key={index}
                >
                  <Typography>{item.info}</Typography>
                  <TextField id="outlined-basic" defaultValue="0" sx={{ pl: 2 }} />
                </Grid>
              ))}
            </Grid>
          </ConfigCard>
        </Grid>

        <Grid item md={4}>
          <ConfigCard container rowSpacing={1}>
            <CharacterConfigTitle title="Stats" />
            <Grid item container rowSpacing={1}>
              {otherStats.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  key={index}
                >
                  <Typography>{item.info}</Typography>
                  <TextField
                    id="outlined-basic"
                    defaultValue="0"
                    sx={{ pl: 2 }}
                    disabled
                  />
                </Grid>
              ))}
            </Grid>
          </ConfigCard>
        </Grid>

        <Grid item md={4}>
          <ConfigCard container rowSpacing={1}>
            <CharacterConfigTitle title="Add stats" />
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
          </ConfigCard>
        </Grid>
      </Grid>
    </>
  );
}
