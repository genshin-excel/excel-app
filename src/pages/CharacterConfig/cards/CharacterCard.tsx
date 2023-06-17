import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, {
  useState,
  Suspense,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { Grid, Card, CardMedia, Button, MenuItem } from "@mui/material";
import CharacterPopup from "../../../components/CharacterPopUp";
import { Character } from "../../../models/Character";
import { RowName } from "..";
import { CustomTextField } from "..";
import { forEach, set } from "lodash";
import { Team } from "../../../models/Team";
import { DBContext } from "../../../database/Database";

type CharacterConfigs = {
  name: string;
  value: number;
  min: number;
  max: number;
};

const CharacterCard = React.memo(
  ({
    character,
    setCharacter,
    charIndex,
    team,
  }: {
    character: Character | null;
    setCharacter: (value: React.SetStateAction<Character | null>) => void;
    charIndex: number;
    team: Team;
  }) => {
    console.log("CharacterCard");
    const database = useContext(DBContext);
    const [openChar, setOpenChar] = useState(false);
    const [characterConfigs, setCharacterConfigs] = useState<
      CharacterConfigs[]
    >(
      [
        ["Ascension", 0, 0, 6],
        ["Level", 1, 1, 90],
        ["Constellation", 0, 0, 6],
      ].map((item) => ({
        name: String(item[0]),
        value: Number(item[1]),
        min: Number(item[2]),
        max: Number(item[3]),
      }))
    );

    const charLevelBreakpointData = [0, 20, 40, 50, 60, 70, 80, 90];
    const ascensionBreakpointData = [0, 1, 2, 3, 4, 5, 6];
    const [ascensionAvailableValues, setAscensionAvailableValues] = useState([
      0,
    ]);

    let characterBaseStats = [
      ["Base HP", 14352],
      ["Base ATK", 352],
      ["Base DEF", 675],
    ].map((item) => ({
      name: String(item[0]),
      value: Number(item[1]),
    }));

    const handleLevelChange = (level: number) => {
      let updatedAscension = 0;
      let index = 0;
      let ascensionList = [];
      for (let itemLevelStr in charLevelBreakpointData) {
        let itemLevel = Number(itemLevelStr);
        if (index === charLevelBreakpointData.length - 1) {
          break;
        }
        if (
          level === charLevelBreakpointData[index + 1] &&
          index < ascensionBreakpointData.length - 1
        ) {
          ascensionList.push(ascensionBreakpointData[index + 1]);
        }
        if (
          level >= itemLevel + 1 &&
          level <= charLevelBreakpointData[index + 1]
        ) {
          updatedAscension = ascensionBreakpointData[index];
          ascensionList.unshift(ascensionBreakpointData[index]);
          break;
        }
        index++;
      }
      const updatedCharacterConfigs = characterConfigs.map((item) => {
        if (item.name === "Ascension") {
          return { ...item, value: updatedAscension };
        }
        if (item.name === "Level") {
          return { ...item, value: level };
        }
        return item;
      });
      setCharacterConfigs(updatedCharacterConfigs);
      setAscensionAvailableValues(ascensionList);
    };

    const handleAscensionChange = (ascension: number) => {
      const updatedCharacterConfigs = characterConfigs.map((item) => {
        if (item.name === "Ascension") {
          return { ...item, value: ascension };
        }
        return item;
      });
      setCharacterConfigs(updatedCharacterConfigs);
    };

    const setSelectedChar = (character: Character) => {
      const newTeam = { ...team };
      newTeam.characters[charIndex - 1] = character;
      database.getTeamDAO().updateTeamByName(team.name, team);
      setCharacter(character);
    };

    return (
      <CharacterConfigCard
        title={"Character" + (character ? ": " + character?.name : "")}
      >
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid item>
            <Card>
              <CardMedia
                component="img"
                image={
                  character
                    ? character.thumbnail
                    : process.env.PUBLIC_URL +
                      "/images/characters/add_new_4.png"
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
                    setSelectedChar(pickedChar)
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
                      select
                      value={item.value}
                      inputProps={{
                        min: item.min,
                        max: item.max,
                        step: 1,
                      }}
                      InputProps={{
                        readOnly:
                          ascensionAvailableValues.length > 1 ? false : true,
                        tabIndex: -1,
                      }}
                      onChange={(event) =>
                        handleAscensionChange(Number(event.target.value))
                      }
                    >
                      {ascensionAvailableValues.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  ) : item.name === "Level" ? (
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
