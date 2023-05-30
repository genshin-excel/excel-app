import React from 'react';
import { Grid } from '@mui/material';

const TableTabs = () => {

    const gridItems = [
        {
            title: 'Character',
            values: ['Name', 'Name', 'Name', 'Name'],
            total: 'Total',
        },
        {
            title: 'Damage Per Rotation',
            values: ['0', '0', '0', '0'],
            total: '0',
        },
        {
            title: 'Damage Per Second',
            values: ['0', '0', '0', '0'],
            total: '0',
        },
        {
            title: 'Damage Contribution',
            values: ['0', '0', '0', '0'],
            total: '0',
        },
    ];

    const gridElements = gridItems.map((item, index) => (
        <React.Fragment key={index}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={3}>
                    {item.title}
                </Grid>
                {item.values.map((value, subIndex) => (
                    <Grid item xs={1.5} key={subIndex}>
                        {value}
                    </Grid>
                ))}
                <Grid item xs={3}>
                    {item.total}
                </Grid>
            </Grid>
            {index === gridItems.length - 1 && (
                <Grid container spacing={2}>
                    <Grid item xs={9} />
                    <Grid item xs={3}>
                        Time: 0s
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    ));

    return (
        <>
            {gridElements}
        </>
    );
};

export default TableTabs;
