import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { Fragment, useState } from "react";
import { Grid, InputAdornment } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";

type SubStatsConfigs = {
  name: string;
  value: number;
  type: string;
  count: number;
};

const SubstatsCard = React.memo(() => {
  console.log("SubstatsCard");
  const [subStatsConfigs, setsubStatsConfigs] = useState<SubStatsConfigs[]>([
    ["HP%", 0.05225, "%", 0],
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
  })));
  const subStatBreakpointData = [0, 0.082, 0.122, 0.163, 0.222, 0.280, 0.338];
  const rollBreakpointData = [0, 1, 2, 3, 4, 5, 6];

  const handleLevelChange = (value: number) => {
    // let updatedValue = 0;
    // let index = 0;
    // for (let itemLevelStr in subStatBreakpointData) {
    //   let itemLevel = Number(itemLevelStr);
    //   if (index === subStatBreakpointData.length - 1) {
    //     break;
    //   }
    //   if (
    //     value >= itemLevel + 1 &&
    //     value <= subStatBreakpointData[index + 1]
    //   ) {
    //     updatedValue = rollBreakpointData[index];
    //     break;
    //   }
    //   index++;
    // }
    // const updatedSubStatsConfigs = subStatsConfigs.map((item) => {
    //   if (item.name === "HP%") {
    //     return { ...item, value: updatedValue };
    //   }
    //   if (item.name === "HP%") {
    //     return { ...item, value: value };
    //   }
    //   return item;
    // });
    // setsubStatsConfigs(updatedSubStatsConfigs);
  };

  const handleRollChange = (roll: number) => {
    const updatedSubStatsConfigs = subStatsConfigs.map((item) => {
      if (item.name === "HP%") {
        return { ...item, value: roll };
      }
      return item;
    });
    setsubStatsConfigs(updatedSubStatsConfigs);
  };






  return (
    <CharacterConfigCard title="Sub stats">
      <Grid container minWidth="100%" rowSpacing={1}>
        {subStatsConfigs.map((item, index) => (
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
                      // id="outlined-basic"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                      value={(item.value * 100).toFixed(2)}
                      sx={{ pl: 2 }}
                      onChange={(event) =>
                        handleLevelChange(Number(event.target.value))
                      }
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
                      max: 6,
                      step: 1,
                    }}
                    onChange={(event) =>
                      handleRollChange(Number(event.target.value))
                    }
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
