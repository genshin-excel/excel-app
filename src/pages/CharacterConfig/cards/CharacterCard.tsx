import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { useState, Suspense } from "react";
import { Grid, Card, CardMedia, Button } from "@mui/material";
import CharacterPopup from "../../../components/CharacterPopUp";
import { Character } from "../../../models/Character";
import { RowName } from "..";
import { CustomTextField } from "..";

const CharacterCard = React.memo(
  ({
    character,
    setCharacter,
  }: {
    character: Character | null;
    setCharacter: (value: React.SetStateAction<Character | null>) => void;
  }) => {
    console.log("CharacterCard");
    const [openChar, setOpenChar] = useState(false);
    const [characterConfigs, setCharacterConfigs] = useState([
      ["Ascension", 0, 0, 6],
      ["Level", 1, 1, 90],
      ["Constellation", 0, 0, 6],
    ].map((item) => ({
      name: String(item[0]),
      value: Number(item[1]),
      min: Number(item[2]),
      max: Number(item[3]),
    })));

    const handleLevelChange = (newValue: number) => {
      let updatedAscension = characterConfigs.find((item) => item.name === "Ascension")!.value;
      if (newValue < 20) {
        updatedAscension = 0;
      } else if (newValue >= 20 && newValue < 40) {
        updatedAscension = 1;
      } else if (newValue >= 40 && newValue < 50) {
        updatedAscension = 2;
      } else if (newValue >= 50 && newValue < 60) {
        updatedAscension = 3;
      } else if (newValue >= 60 && newValue < 70) {
        updatedAscension = 4;
      } else if (newValue >= 70 && newValue < 80) {
        updatedAscension = 5;
      } else if (newValue >= 80 && newValue <= 90) {
        updatedAscension = 6;
      }

      const updatedCharacterConfigs = characterConfigs.map((item) =>
        item.name === "Ascension" ? { ...item, value: updatedAscension } : item
      );

      setCharacterConfigs(updatedCharacterConfigs);
    };


    let characterBaseStats = [
      ["Base HP", 14352],
      ["Base ATK", 352],
      ["Base DEF", 675],
    ].map((item) => ({
      name: String(item[0]),
      value: Number(item[1]),
    }));

    return (
      <CharacterConfigCard title="Character">
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid item>
            <Card>
              <CardMedia
                component="img"
                image={
                  character
                    ? character.thumbnail
                    : process.env.PUBLIC_URL + "/images/characters/add_new_4.png"
                }
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
        <Grid container item xs={12} sm={9} md={9} lg={9} pt={1}>
          <Grid item container xs={8} rowSpacing={1}>
            {characterConfigs.map((item, index) => (
              <Grid
                key={index}
                item
                container
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                xs={12}
              >
                <Grid item xs={6} pr={1} pl={1}>
                  <RowName>{item.name}</RowName>
                </Grid>
                <Grid item xs={6}>
                  {item.name === "Ascension" ? (
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      type="number"
                      value={item.value}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                      InputProps={{
                        readOnly: true,
                        tabIndex: -1,
                        style: { backgroundColor: "white" },
                      }}
                    />
                  ) : item.name === "Level" ? (
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      type="number"
                      defaultValue={item.value}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                      onChange={(event) =>
                        handleLevelChange(Number(event.target.value))
                      }
                    />
                  ) : (
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      type="number"
                      defaultValue={item.value}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item container xs={4} rowSpacing={1}>
            {characterBaseStats.map((item, index) => (
              <Grid
                key={index}
                item
                container
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                pl={1}
                xs={12}
              >
                <CustomTextField
                  variant="filled"
                  label={item.name}
                  fullWidth
                  defaultValue={item.value}
                  InputProps={{
                    readOnly: true,
                    tabIndex: -1,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CharacterConfigCard>
    );
  }
);

export default CharacterCard;
