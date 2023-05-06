import React, { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

interface Props {
  value: string;
  editFunc: (text: string) => void;
  onBlur: () => void;
}

function EditTextField({ value, editFunc, onBlur }: Props) {
  const editFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, []);

  return (
    <TextField
      inputRef={editFieldRef}
      value={value}
      onChange={(event) => editFunc(event.target.value)}
      onBlur={onBlur}
    />
  );
}

export default EditTextField;
