import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { Fragment, useState, useCallback } from "react";
import { Grid, InputAdornment } from "@mui/material";
import { RowName } from "..";
import { CustomTextField } from "..";
import { formatFloatNumber } from "../../../util/format";

type SubStatsConfigs = {
  name: string;
  value: number;
  type: string;
  roll: number;
  rollValue: number;
};

const SubstatsCard = React.memo(() => {
  console.log("SubstatsCard");
  const [subStatsConfigs, setsubStatsConfigs] = useState<SubStatsConfigs[]>([
    ["HP%", 0.05225, "%", 0, 0.0496],
    ["HP", 299, "+", 0, 253.94],
    ["ATK%", 0.2777, "%", 0, 0.0496],
    ["ATK", 38, "+", 0, 16.54],
    ["DEF%", 0.365, "%", 0, 0.062],
    ["DEF", 80, "+", 0, 19.68],
    ["EM", 187, "+", 0, 19.82],
    ["ER", 0.456, "%", 0, 0.0551],
    ["CR", 0.311, "%", 0, 0.0331],
    ["CD", 0.622, "%", 0, 0.0662],
  ].map((item) => ({
    name: String(item[0]),
    value: Number(item[1]),
    type: String(item[2]),
    roll: Number(item[3]),
    rollValue: Number(item[4]),
  })));

  const handleValueChange = useCallback((value: number, index: number) => {
    const updatedSubStatsConfigs = [...subStatsConfigs];
    const actualValue = updatedSubStatsConfigs[index].type === "%" ? value / 100 : value;
    updatedSubStatsConfigs[index].value = actualValue;
    updatedSubStatsConfigs[index].roll = actualValue / updatedSubStatsConfigs[index].rollValue;
    setsubStatsConfigs(updatedSubStatsConfigs);
  }, [subStatsConfigs])

  const handleRollChange = useCallback((roll: number, index: number) => {
    const updatedSubStatsConfigs = [...subStatsConfigs];
    updatedSubStatsConfigs[index].roll = roll;
    updatedSubStatsConfigs[index].value = updatedSubStatsConfigs[index].rollValue * roll;
    setsubStatsConfigs(updatedSubStatsConfigs);
  }, [subStatsConfigs]);

  return (
    <CharacterConfigCard title="Sub stats">
      <Grid container minWidth="100%" rowSpacing={1}>
        {subStatsConfigs.map((item, index) => (
          <SubstatsLine index={index} substats={item} handleValueChange={handleValueChange} handleRollChange={handleRollChange}/>
          // <Fragment key={index}>
          //   <Grid item container xs={8}>
          //     <Grid
          //       item
          //       container
          //       xs={12}
          //       display="flex"
          //       alignItems="flex-end"
          //       justifyContent="flex-end"
          //       pl={2}
          //     >
          //       <Grid item xs={3}>
          //         <RowName>{item.name}</RowName>
          //       </Grid>
          //       <Grid item xs={9}>
          //         {item.type === "%" && (
          //           <CustomTextField
          //             fullWidth
          //             variant="filled"
          //             // id="outlined-basic"
          //             type="number"
          //             InputProps={{
          //               startAdornment: (
          //                 <InputAdornment position="start">%</InputAdornment>
          //               ),
          //             }}
          //             value={formatFloatNumber(item.value * 100)}
          //             sx={{ pl: 2 }}
          //             onChange={(event) =>
          //               handleValueChange(Number(event.target.value), index)
          //             }
          //           />
          //         )}
          //         {item.type === "+" && (
          //           <CustomTextField
          //             variant="filled"
          //             fullWidth
          //             id="outlined-basic"
          //             value={formatFloatNumber(item.value)}
          //             type="number"
          //             sx={{ pl: 2 }}
          //             onChange={(event) =>
          //               handleValueChange(Number(event.target.value), index)
          //             }
          //           />
          //         )}
          //       </Grid>
          //     </Grid>
          //   </Grid>
          //   <Grid item container xs={4} rowSpacing={1}>
          //     <Grid
          //       item
          //       container
          //       xs={12}
          //       display="flex"
          //       alignItems="flex-end"
          //       justifyContent="flex-end"
          //       key={index}
          //       pl={2}
          //     >
          //       <Grid item xs={12}>
          //         <CustomTextField
          //           variant="filled"
          //           label="Rolls"
          //           fullWidth
          //           type="number"
          //           value={formatFloatNumber(item.roll)}
          //           inputProps={{
          //             step: 1,
          //           }}
          //           onChange={(event) =>
          //             handleRollChange(Number(event.target.value), index)
          //           }
          //         />
          //       </Grid>
          //     </Grid>
          //   </Grid>
          // </Fragment>
        ))}
      </Grid>
    </CharacterConfigCard>
  );
})

const SubstatsLine = React.memo(({index, substats, handleValueChange, handleRollChange} 
  : {index: number, substats: SubStatsConfigs, handleValueChange: (roll: number, index: number) => void, 
    handleRollChange: (roll: number, index: number) => void}) => {
  console.log(`substatLine #${index}`);
  return (
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
                  <RowName>{substats.name}</RowName>
                </Grid>
                <Grid item xs={9}>
                  {substats.type === "%" && (
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
                      value={formatFloatNumber(substats.value * 100)}
                      sx={{ pl: 2 }}
                      onChange={(event) =>
                        handleValueChange(Number(event.target.value), index)
                      }
                    />
                  )}
                  {substats.type === "+" && (
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      id="outlined-basic"
                      value={formatFloatNumber(substats.value)}
                      type="number"
                      sx={{ pl: 2 }}
                      onChange={(event) =>
                        handleValueChange(Number(event.target.value), index)
                      }
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
                    value={formatFloatNumber(substats.roll)}
                    inputProps={{
                      step: 1,
                    }}
                    onChange={(event) =>
                      handleRollChange(Number(event.target.value), index)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
  );
}
// , (prevProps, nextProps) => {
//   console.log(`prev ${prevProps.substats.roll} ${nextProps.substats.value}`);
//   console.log(`next ${prevProps.substats.roll} ${nextProps.substats.value}`);
//   return prevProps.substats.roll == nextProps.substats.roll && prevProps.substats.value == nextProps.substats.value;
// }
)

export default SubstatsCard;
