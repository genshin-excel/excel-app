import CharacterConfigCard from "../../../components/CharacterConfigCard";
import { Grid, InputAdornment } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";
import React from "react";

const FinalCharacterStatsCard = React.memo(() => {
  console.log("FinalCharacterStatsCard");
  let finalStats = [
    ["ATK", 0, "+"],
    ["EM", 0, "+"],
    ["HP", 40000, "+"],
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

  return (
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
  );
})

export default FinalCharacterStatsCard;
