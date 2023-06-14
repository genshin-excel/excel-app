import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React from "react";
import { Grid, MenuItem } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";

const ArtifactMainStatsCard = React.memo(() => {
  console.log("ArtifactMainStatsCard");
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
            <Grid item xs={4}>
              <RowName>{stats.name}</RowName>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                variant="filled"
                fullWidth
                select
                defaultValue={stats.values[0]}
                sx={{ pl: 2 }}
              >
                {stats.values.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </CharacterConfigCard>
  );
});

export default ArtifactMainStatsCard;
