import React, { useEffect, useRef, useCallback } from 'react';
import { TextField } from '@mui/material';
import { IconButton, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  value: string;
  editFunc: (text: string) => void;
  onBlur: () => void;
  onCancel: () => void;
}

function EditTextField({ value, editFunc, onBlur, onCancel }: Props) {
  const editFieldRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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
      onBlur();
    },
    [onBlur]
  );

  const handleEditFunc = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      editFunc(event.target.value);
    },
    [editFunc]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onBlur();
      }
    },
    [onBlur]
  );

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Grid container alignItems='center'>
      <TextField
        id='team-name'
        inputRef={editFieldRef}
        value={value}
        onChange={handleEditFunc}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      <IconButton ref={cancelButtonRef} aria-label='Cancel' onClick={handleCancel} style={{ color: 'Red' }}>
        <Close />
      </IconButton>
    </Grid>
  );
}

export default EditTextField;
