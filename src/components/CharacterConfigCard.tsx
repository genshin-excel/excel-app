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
      container
      item
      rowSpacing={1}
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "8px",
      }}
    >
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {children}
    </Grid>
  );
}

export default CharacterConfigCard;
