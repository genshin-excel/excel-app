import CharacterConfigCard from "../../../components/CharacterConfigCard";
import React, { useState, Suspense } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import { StyledDeleteIcon } from "..";
import ArtifactPopup from "../../../components/ArtifactsPopUp";
import { Artifact } from "../../../models/Artifacts";

const ArtifactCard = React.memo(
  ({
    artifactSets,
    setArtifactSets,
  }: {
    artifactSets: { name: string; image: string }[];
    setArtifactSets: React.Dispatch<
      React.SetStateAction<{ name: string; image: string }[]>
    >;
  }) => {
    console.log("ArtifactCard");
    const [checked, setChecked] = useState(true);
    const [openArtifact, setOpenArtifact] = useState(false);

    const handleCheckBoxChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setChecked(event.target.checked);
    };

    const handleDeleteArtifactSet = (index: number) => {
      setArtifactSets((prevSets) => {
        const updatedSets = [...prevSets];
        updatedSets.splice(index, 1);
        return updatedSets;
      });
    };

    const handleArtifactImageSelection = (pickedArtifact: Artifact) => {
      if (artifactSets.length < 3) {
        setArtifactSets([
          ...artifactSets,
          { name: pickedArtifact.name, image: pickedArtifact.thumbnail },
        ]);
      }
    };

    return (
      <CharacterConfigCard title="Artifact Set">
        <Grid container item xs={12} pb={1} rowSpacing={1} columnSpacing={1}>
          {artifactSets.map((artifactSet, index) => (
            <Grid container item sm={6} md={4} lg={6} key={index}>
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                <Grid item xs={4} md={4} lg={4} p={1} key={index}>
                  <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                    <CardMedia
                      component="img"
                      image={artifactSet.image}
                      alt="artifact"
                    />
                  </Card>
                </Grid>

                <Grid item container xs={8} md={8} lg={8}>
                  <Grid item xs={12} pl={1}>
                    <Typography> {artifactSet.name} </Typography>
                  </Grid>
                  <Grid
                    item
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    xs={5}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckBoxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography textAlign="center">2</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckBoxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                    />

                    <Typography textAlign="center">4</Typography>
                  </Grid>
                  <Grid item display="flex" alignItems="center" xs={2}>
                    <StyledDeleteIcon
                      sx={{ color: "red" }}
                      onClick={() => handleDeleteArtifactSet(index)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            fullWidth
            disabled={artifactSets.length >= 3}
            variant="contained"
            color="primary"
            onClick={() => setOpenArtifact(true)}
            // sx={{ width: "100%" }}
          >
            Add New Set
          </Button>
          <Suspense fallback={null}>
            {openArtifact && (
              <ArtifactPopup
                onClose={() => setOpenArtifact(false)}
                onSelectImage={(pickedArtifact: Artifact) =>
                  handleArtifactImageSelection(pickedArtifact)
                }
                oldArtifact={null}
              />
            )}
          </Suspense>
        </Grid>
      </CharacterConfigCard>
    );
  }
);

export default ArtifactCard;
