import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

function CharacterConfigCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Grid
      // container
      item
      // rowSpacing={1}
      // justifyContent="flex-start"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "8px",
        width: "100%",
        // flexGrow: 1,
      }}
    >
      <Grid>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      </Grid>
      <Grid pb={1}>
        <Divider />
      </Grid>
      <Grid container>
        {children}
      </Grid>
    </Grid>
  );
}

export default CharacterConfigCard;
