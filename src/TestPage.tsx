import React from 'react';
import { Grid } from '@mui/material';
import { styled } from "@mui/system";

import CharacterConfigTitle from './components/CharacterConfigTilte';

// const titles = ["Character", "Weapon", "Set Bonus", "Set Up", "Artifact", "Sub Stats", "Stats", "Add Stats"];
// const ConfigCard = styled(Grid)(({ theme }) => ({
// backgroundColor: "rgba(0, 0, 0, 0.2)",
// padding: "8px",
//   '& .MuiGrid-item': {
//     marginBottom: theme.spacing(1),
//   },
//   '& > .MuiGrid-root': {
//     rowGap: theme.spacing(0.5),
//   },
// }));

const MainComponent = () => {
    return (
        <>
            <Grid></Grid>
        </>
        // <Grid container>
        //   {/* ...other code... */}
        //   {titles.map((title, index) => (
        //     <Grid key={index} item xs={12} sm={6} md={6}>
        //       <ConfigCard container rowSpacing={1}>
        //         <CharacterConfigTitle title={title} />
        //         {/* ...other code specific to each section... */}
        //       </ConfigCard>

        //     </Grid>

        //   ))}
        //   {/* ...other code... */}
        // </Grid>
    );
}

export default MainComponent;
