import React, { useState, useDeferredValue, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchField({setFinalValueHandler}: {setFinalValueHandler: (value: string) => void}){

    const [searchValue, setSearchValue] = useState('');
    const deferredQuery = useDeferredValue(searchValue);

    console.log("SearchField searchValue: " + searchValue);
    console.log("SearchField deferredQuery: " + deferredQuery.valueOf());

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }, [setSearchValue]);

    useEffect(() => {
        setFinalValueHandler(deferredQuery.valueOf());
    }, [deferredQuery, setFinalValueHandler]);

    return (
        <TextField
            fullWidth
            label="Search"
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
                endAdornment: (
                    <IconButton disabled>
                        <SearchIcon />
                    </IconButton>
                ),
            }}
            sx={{ marginBottom: '16px', marginTop: '6px' }}
        />
    )
}
