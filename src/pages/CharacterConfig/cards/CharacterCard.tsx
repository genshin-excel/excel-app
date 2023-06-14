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
                image={character? character.thumbnail : process.env.PUBLIC_URL + "/images/characters/add_new_4.png"}
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
                  <CustomTextField
                    variant="filled"
                    fullWidth
                    type="number"
                    defaultValue={item.value}
                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    //   console.log('test')
                    // }
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
