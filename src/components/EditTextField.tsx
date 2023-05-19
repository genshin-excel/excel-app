import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextField } from '@mui/material';
import { IconButton, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  value: string;
  onBlur: (newName: string) => void;
  onCancel: () => void;
}

function EditTextField({ value, onBlur, onCancel }: Props) {
  const editFieldRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  
  const [newTeamName, setNewTeamName] = useState(value);
  console.log(`EditTextField: ${newTeamName}`);

  useEffect(() => {
    if (editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, []);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { relatedTarget } = event;
      if (cancelButtonRef.current && relatedTarget && cancelButtonRef.current.contains(relatedTarget)) {
        return;
      }
      onBlur(newTeamName);
    },
    [newTeamName, onBlur]
  );

  const handleEditFunc = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTeamName(event.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onBlur(newTeamName);
      }
    },
    [newTeamName, onBlur]
  );

  

  return (
    <Grid container alignItems='center'>
      <TextField
        id='team-name'
        inputRef={editFieldRef}
        value={newTeamName}
        onChange={handleEditFunc}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      <IconButton ref={cancelButtonRef} aria-label='Cancel' onClick={onCancel} style={{ color: 'Red' }}>
        <Close />
      </IconButton>
    </Grid>
  );
}

export default EditTextField;
