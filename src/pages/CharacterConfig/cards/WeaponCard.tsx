import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { useState, Suspense } from "react";
import { Grid, Card, CardMedia, Button, MenuItem } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";
import WeaponPopup from "../../../components/WeponPopUp";
import { Weapon } from "../../../models/Weapon";

type WeaponConfigs = {
  name: string;
  value: number;
  min: number;
  max: number;
};

const WeaponCard = React.memo(
  ({
    weapon,
    setWeapon,
  }: {
    weapon: Weapon;
    setWeapon: (value: React.SetStateAction<Weapon>) => void;
  }) => {
    console.log("WeaponCard");
    const [openWeapon, setOpenWeapon] = useState(false);

    const [weaponConfigs, setWeaponConfigs] = useState<WeaponConfigs[]>([
      ["Refinement", 0, 1, 5],
      ["Ascension", 0, 0, 6],
      ["Level", 1, 1, 90],
      ["ATK", 0],
    ].map((item) => ({
      name: String(item[0]),
      value: Number(item[1]),
      min: Number(item[2]),
      max: Number(item[3]),
    })));

    const weaponLevelBreakpointData = [0, 20, 40, 50, 60, 70, 80, 90];
    const ascensionBreakpointData = [0, 1, 2, 3, 4, 5, 6];
    const [ascensionAvailableValues, setAscensionAvailableValues] = useState([
      0,
    ]);

    const handleLevelChange = (level: number) => {
      let updatedAscension = 0;
      let index = 0;
      let ascensionList = [];
      for (let itemLevelStr in weaponLevelBreakpointData) {
        let itemLevel = Number(itemLevelStr);
        if (index === weaponLevelBreakpointData.length - 1) {
          break;
        }
        if (
          level === weaponLevelBreakpointData[index + 1] &&
          index < ascensionBreakpointData.length - 1
        ) {
          ascensionList.push(ascensionBreakpointData[index + 1]);
        }
        if (
          level >= itemLevel + 1 &&
          level <= weaponLevelBreakpointData[index + 1]
        ) {
          updatedAscension = ascensionBreakpointData[index];
          ascensionList.unshift(ascensionBreakpointData[index]);
          break;
        }
        index++;
      }
      const updatedWeaponConfigs = weaponConfigs.map((item) => {
        if (item.name === "Ascension") {
          return { ...item, value: updatedAscension };
        }
        if (item.name === "Level") {
          return { ...item, value: level };
        }
        return item;
      });
      setWeaponConfigs(updatedWeaponConfigs);
      setAscensionAvailableValues(ascensionList);
    };

    const handleAscensionChange = (ascension: number) => {
      const updatedCharacterConfigs = weaponConfigs.map((item) => {
        if (item.name === "Ascension") {
          return { ...item, value: ascension };
        }
        return item;
      });
      setWeaponConfigs(updatedCharacterConfigs);
    };

    const handleCloseWeapon = () => {
      setOpenWeapon(false);
    };

    return (
      <CharacterConfigCard title="Weapon">
        <Grid item xs={12} sm={3} md={3} lg={3}>
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
          container
          item
          xs={12}
          sm={9}
          md={9}
          lg={9}
          pt={1}
          justifyContent="flex-end"
          rowSpacing={1}
        >
          {weaponConfigs.slice(0, -2).map((item, index) => (
            <Grid key={index} item display="flex" alignItems="flex-end" xs={12}>
              <Grid item xs={6} pl={1} pr={1}>
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
                ) : (
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
                  />
                )}
              </Grid>
            </Grid>
          ))}

          <Grid item display="flex" alignItems="flex-end" xs={12}>
            <Grid item xs={6} pl={1} pr={1}>
              <RowName>{weaponConfigs[2].name}</RowName>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                fullWidth
                variant="filled"
                type="number"
                defaultValue={weaponConfigs[2].value}
                onChange={(event) =>
                  handleLevelChange(Number(event.target.value))
                }
                inputProps={{
                  min: weaponConfigs[2].min,
                  max: weaponConfigs[2].max,
                  step: 1,
                }}
              />
            </Grid>
            <Grid item xs={3.5}>
              <CustomTextField
                variant="filled"
                label={weaponConfigs[3].name}
                fullWidth
                defaultValue={weaponConfigs[3].value}
                sx={{
                  pl: 1,
                  "& .MuiInputLabel-root": {
                    pl: 1,
                  },
                }}
                InputProps={{
                  readOnly: true,
                  tabIndex: -1,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CharacterConfigCard>
    );
  }
);

export default WeaponCard;
