import React, { useState, useContext, Suspense } from "react";
import { Grid, Typography, TextField, Button, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Character } from "../../models/Character";
import { Weapon } from "../../models/Weapon";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CharacterCard from "./cards/CharacterCard";
import WeaponCard from "./cards/WeaponCard";
import ArtifactCard from "./cards/ArtifactCard";
import ArtifactMainStatsCard from "./cards/ArtifactMainStatsCard";
import TalentsCard from "./cards/TalentsCard";
import SubstatsCard from "./cards/SubstatsCard";
import FinalCharacterStatsCard from "./cards/FinalCharacterStatsCard";
import StatsBonusCard from "./cards/StatsBonusCard";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { DBContext } from "../../database/Database";
import { Team } from "../../models/Team";


export const CustomTextField = styled(TextField)`
  & .MuiFilledInput-root {
    background-color: #f5f5f5;
  }
  & .MuiFilledInput-root:hover {
    background-color: #f5f5f5;
  }
  & .MuiFilledInput-root.Mui-readOnly {
    background-color: #ffd70075;
  }
  & .MuiFilledInput-root.Mui-focused:not(.Mui-readOnly) {
    background-color: #e0e0e0;
  }
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
  &:hover {
    cursor: pointer;
  }
`;

export const RowName = styled(Typography)(({ theme }) => ({
  paddingBottom: "7px",
  textAlign: "right",
}));

function CharacterConfig({ char, team, charIndex }: { char: Character | null, team: Team, charIndex: number }) {
  console.log("CharacterConfig");
  document.title = "CharacterConfig";

  const handleBackClick = () => {
    window.history.back();
  };

  const [character, setCharacter] = useState<Character | null>(char);

  const [weapon, setWeapon] = useState<Weapon>({
    id: "",
    name: "",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/add_new_4.png",
  });

  const [artifactSets, setArtifactSets] = useState<
    { name: string; image: string }[]
  >([]);

  const [stastBonus, setStatsBonus] = useState<
    { title: string; name: string[]; values: string }[]
  >([]);

const [title, setTitle]=useState("");

  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={2} maxWidth="xl">
        <Grid container item xs={12}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Back to Team
            </Typography>
          </Button>
        </Grid>

        {/*---------------------Character------------------------------ */}
        <Grid container item xs={12} sm={12} md={12} lg={6}>
          <CharacterCard character={character} setCharacter={setCharacter} charIndex={charIndex} team={team} />
        </Grid>

        {/*---------------------Weapon------------------------------ */}
        <Grid container item xs={12} sm={12} md={12} lg={6}>
          <WeaponCard weapon={weapon} setWeapon={setWeapon} />
        </Grid>

        {/*---------------------Artifact Set------------------------------ */}
        <Grid container item xs={12} sm={12} md={12} lg={5}>
          <ArtifactCard artifactSets={artifactSets} setArtifactSets={setArtifactSets} />
        </Grid>

        {/*---------------------Artifact Main Stats------------------------------ */}
        <Grid container item xs={12} sm={6} md={6} lg={4}>
          <ArtifactMainStatsCard nameArtifact={title} setNameArtifact={setTitle}/>
        </Grid>

        {/*---------------------Talents------------------------------ */}
        <Grid container item xs={12} sm={6} md={6} lg={3}>
          <TalentsCard />
        </Grid>

        {/*---------------------Substats------------------------------ */}
        <Grid container item xs={12} sm={6} md={6} lg={3}>
          <SubstatsCard />
        </Grid>

        {/*---------------------Final Character Stats------------------------------ */}
        <Grid container item xs={12} sm={6} md={6} lg={3}>
          <FinalCharacterStatsCard />
        </Grid>

        {/*---------------------Stats Bonus------------------------------ */}
        <Grid container item xs={12} md={12} lg={6}>
          <StatsBonusCard stastBonus={stastBonus} setStatsBonus={setStatsBonus} name={title}/>
        </Grid>
      </Grid>
    </>
  );
}

export default function CharacterConfigFilter() {
  console.log("CharacterConfigFilter");
  const { teamIndex, charIndex } = useParams();
  const database = useContext(DBContext);

  if (!teamIndex) {
    return <Navigate to="../" />;
  }
  var team = database.getTeamDAO().getTeamByName(teamIndex);
  if (!team) {
    return <Navigate to="../" />;
  }
  if (!charIndex || ["1", "2", "3", "4"].indexOf(charIndex) < 0) {
    return <Navigate to="../" />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterConfig team={team} char={team.characters[Number(charIndex) - 1]} charIndex={Number(charIndex)}/>
    </Suspense>
  );
}
