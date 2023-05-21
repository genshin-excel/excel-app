import React, {useCallback} from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

function TabsDropdownComponents() {
  const [selectedItem, setSelectedItem] = React.useState<string>("");

  const items = ["None", "Option 1", "Option 2", "Option 3"];

  const handleItemChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        setSelectedItem(event.target.value);
      },
    []
  );

  return (
    <FormControl variant="outlined" fullWidth sx={{ minWidth: "150px", maxWidth: "300px",  marginLeft:"8px", marginRight: "8px"}}>
      <InputLabel id="name-label">Name</InputLabel>
      <Select
        labelId="name-label"
        label="Name"
        variant="outlined"
        value={selectedItem || ""}
        onChange={handleItemChange}
      >
        {items.map((item, itemIndex) => (
          <MenuItem key={itemIndex} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TabsDropdownComponents;
