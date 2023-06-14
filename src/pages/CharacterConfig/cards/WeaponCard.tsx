import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { useState, Suspense } from "react";
import { Grid, Card, CardMedia, Button } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";
import WeaponPopup from "../../../components/WeponPopUp";
import { Weapon } from "../../../models/Weapon";

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

    let weaponConfigs = [
      ["Refinement", 0, 1, 5],
      ["Ascension", 0, 0, 6],
      ["Level", 1, 1, 90],
    ].map((item) => ({
      name: String(item[0]),
      value: Number(item[1]),
      min: Number(item[2]),
      max: Number(item[3]),
    }));

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
          {weaponConfigs.slice(0, -1).map((item, index) => (
            <Grid key={index} item display="flex" alignItems="flex-end" xs={12}>
              <Grid item xs={6} pl={1} pr={1}>
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
                />
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
                label={weaponConfigs[2].name}
                fullWidth
                defaultValue={weaponConfigs[2].value}
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
