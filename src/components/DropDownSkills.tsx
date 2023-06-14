import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useCallback, useState } from "react";

interface SelectedSkills {
  [key: string]: string;
}
interface LineState {
  selectedSkills: SelectedSkills;
}

function DropDownSkills({ lineCount }: { lineCount: number }) {
  console.log("DropDownSkills");
  const [lines, setLines] = useState<LineState[]>([{ selectedSkills: {} }]);

  const skills = [
    { id: "skill1", options: ["None", "Option 1", "Option 2", "Option 3"] },
    { id: "skill2", options: ["Option 4", "Option 5", "Option 6"] },
    { id: "skill3", options: ["Option 7", "Option 8", "Option 9"] },
    { id: "skill4", options: ["Option 10", "Option 11", "Option 12"] },
  ];

  const handleSkillsChange = useCallback(
    (lineIndex: number, skillId: string) =>
      (event: SelectChangeEvent<string>) => {
        setLines((prevLines) => {
          const updatedLines = [...prevLines];
          updatedLines[lineIndex].selectedSkills[skillId] = event.target.value;
          return updatedLines;
        });
      },
    []
  );

  return (
    <>
    {Array.from({ length: lineCount }).map((_, index) => (
      <Grid container marginBottom="16px" key={index}>
      {lines.map((line, lineIndex) => (
        <Grid item container xs={12} key={lineIndex} spacing={2}>
          {skills.map(({ id, options }) => (
            <Grid item xs={3} key={id}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="name-label">Name</InputLabel>
                <Select
                  labelId="name-label"
                  label="Name"
                  variant="outlined"
                  id={id}
                  // fullWidth
                  value={line.selectedSkills[id] || ""}
                  onChange={handleSkillsChange(lineIndex, id)}
                >
                  {options.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
    ))}
    </>
    
  );
}
export default DropDownSkills;
