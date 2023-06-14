import CharacterConfigCard from "../../../components/CharacterConfigCard";
import { Grid } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";
import React from "react";

const TalentsCard = React.memo(() => {
  console.log("TalentsCard");
  let talents = [
    ["Normal ATK", 1, 1, 15],
    ["Skill", 1, 1, 15],
    ["Burst", 1, 1, 15],
  ].map((stats) => ({
    name: String(stats[0]),
    value: Number(stats[1]),
    min: Number(stats[2]),
    max: Number(stats[3]),
  }));

  return (
    <CharacterConfigCard title="Talents">
      <Grid item xs={12} container justifyContent="flex-end" rowSpacing={1}>
        {talents.map((item, index) => (
          <Grid
            key={index}
            item
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            xs={12}
          >
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
      </Grid>
    </CharacterConfigCard>
  );
})

export default TalentsCard;
