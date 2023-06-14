import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { Fragment } from "react";
import { Grid, InputAdornment } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";

const SubstatsCard = React.memo(() => {
  console.log("SubstatsCard");
  let substats = [
    ["HP%", 0.198, "%", 0],
    ["HP", 299, "+", 0],
    ["ATK%", 0.2777, "%", 0],
    ["ATK", 38, "+", 0],
    ["DEF%", 0.365, "%", 0],
    ["DEF", 80, "+", 0],
    ["EM", 187, "+", 0],
    ["ER", 0.456, "%", 0],
    ["CR", 0.311, "%", 0],
    ["CD", 0.622, "%", 0],
  ].map((item) => ({
    name: String(item[0]),
    value: Number(item[1]),
    type: String(item[2]),
    count: Number(item[3]),
  }));

  return (
    <CharacterConfigCard title="Sub stats">
      <Grid container minWidth="100%" rowSpacing={1}>
        {substats.map((item, index) => (
          <Fragment key={index}>
            <Grid item container xs={8}>
              <Grid
                item
                container
                xs={12}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                pl={2}
              >
                <Grid item xs={3}>
                  <RowName>{item.name}</RowName>
                </Grid>
                <Grid item xs={9}>
                  {item.type === "%" && (
                    <CustomTextField
                      fullWidth
                      variant="filled"
                      id="outlined-basic"
                      type="number"
                      InputProps={{
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
                      variant="filled"
                      fullWidth
                      id="outlined-basic"
                      defaultValue={item.value.toFixed(2)}
                      type="number"
                      sx={{ pl: 2 }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={4} rowSpacing={1}>
              <Grid
                item
                container
                xs={12}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                key={index}
                pl={2}
              >
                <Grid item xs={12}>
                  <CustomTextField
                    variant="filled"
                    label="Rolls"
                    fullWidth
                    type="number"
                    defaultValue={item.count}
                    inputProps={{
                      min: 0,
                      step: 1,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </CharacterConfigCard>
  );
})

export default SubstatsCard;
