import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React from "react";
import { Grid, MenuItem, Button } from "@mui/material";
import { CustomTextField } from "..";
import { StyledDeleteIcon } from "..";

const StatsBonusCard = React.memo(
  ({
    stastBonus,
    setStatsBonus,
  }: {
    stastBonus: { title: string; name: string[]; values: string }[];
    setStatsBonus: React.Dispatch<
      React.SetStateAction<{ title: string; name: string[]; values: string }[]>
    >;
  }) => {
    console.log("StatsBonusCard");
    let initialStats = {
      title: "Blizzard Strayer",
      name: [
        "ATK%",
        "ATK",
        "HP%",
        "HP",
        "DEF%",
        "DEF",
        "EM",
        "ER",
        "ELE DMG",
        "PHY DMG",
        "CRIT DMG",
        "CRIT RATE",
        "HEALING",
      ],
      values: "40000",
    };

    const handleAddStatsChange = () => {
      setStatsBonus((prevStats) => [...prevStats, { ...initialStats }]);
    };

    const handleDelete = (index: number) => {
      setStatsBonus((prevStats) => {
        const updatedStats = [...prevStats];
        updatedStats.splice(index, 1);
        return updatedStats;
      });
    };

    return (
      <CharacterConfigCard title="Stats Bonus">
        <Grid item container rowSpacing={1} pb={1}>
          {stastBonus.map((stats, index) => (
            <Grid
              item
              container
              xs={12}
              display="flex"
              alignItems="flex-end"
              justifyContent="flex-end"
              columnSpacing={1}
              key={index}
            >
              <Grid item xs={5}>
                <CustomTextField
                  variant="filled"
                  label="Name"
                  fullWidth
                  defaultValue={`${stats.title} ${index}`}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomTextField
                  variant="filled"
                  label="Type"
                  fullWidth
                  select
                  defaultValue={stats.name[0]}
                >
                  {stats.name.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={3}>
                <CustomTextField
                  variant="filled"
                  type="number"
                  fullWidth
                  defaultValue={stats.values}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledDeleteIcon
                  sx={{ color: "red" }}
                  onClick={() => handleDelete(index)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={12} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStatsChange}
            sx={{ width: "100%" }}
          >
            Add Stats
          </Button>
        </Grid>
      </CharacterConfigCard>
    );
  }
);

export default StatsBonusCard;
