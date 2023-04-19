import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'char' | 'time' | 'duration' | 'char1' | 'char2' | 'char3' | 'char4' | 'element' | 'dmg';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'char', label: 'On-field Char', minWidth: 170 },
    { id: 'time', label: 'On-field Time', minWidth: 100 },
    {
        id: 'duration',
        label: 'Duration(s)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'char1',
        label: 'Character 1',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'char2',
        label: 'Character 2',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'char3',
        label: 'Character 3',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'char4',
        label: 'Character 4',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'element',
        label: 'Element',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'dmg',
        label: 'DMG',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    char: string;
    time: string;
    duration: number;
    char1: string;
    char2: string;
    char3: string;
    char4: string;
    element: string;
    dmg: number;
}

function createData(
    char: string,
    time: string,
    duration: number,
    char1: string,
    char2: string,
    char3: string,
    char4: string,
    element: string,
    dmg: number
): Data {
    return { char, time, duration, char1, char2, char3, char4, element, dmg };
}

const rows = [
    createData('Char1', '12:30', 5, 'Character A', 'Character B', 'Character C', 'Character D', 'Fire', 1234),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),
    createData('Char2', '13:00', 7, 'Character E', 'Character F', 'Character G', 'Character H', 'Water', 5678),

];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.duration}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}