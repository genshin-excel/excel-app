import React, { useEffect, useRef} from 'react';
import { TextField } from '@mui/material';
import { Typography, IconButton , Grid} from '@mui/material';
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const { relatedTarget } = event;
    if (cancelButtonRef.current && relatedTarget && cancelButtonRef.current.contains(relatedTarget)) {
      return;
    }
    onBlur()
  }

  return (
    <Grid container alignItems='center'>
      <TextField
        id="team-name"
        inputRef={editFieldRef}
        value={value}
        onChange={(event) => editFunc(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onBlur();
        }}}
        />
      
      <IconButton ref={cancelButtonRef}
        aria-label="Cancel" onClick={()=>onCancel()} style={{color:'Red'}}>
              <Close/>
      </IconButton>
    </Grid>
  );
}

export default EditTextField;
