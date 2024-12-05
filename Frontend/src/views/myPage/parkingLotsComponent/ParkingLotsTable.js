import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import UpdateParkingLotsForm from './UpdateParkingLotsForm';

export default function ParkingLotsTable({ 
    page, 
    rowsPerPage, 
    rows,
    handleChangeRowsPerPage,
    moveFirstPage,
    moveLastPage,
    moveBeforePage,
    moveNextPage,
    deleteParkingLots,
    onUpdateParkingLot
}) {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [updateParkingLot, setUpdateParkingLot] = useState(undefined);

    const emptyRows = page > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;


    const closeForm = () => {
        setIsOpenForm(false);
        setUpdateParkingLot(undefined);
    }

    const openForm = (row) => {
        setUpdateParkingLot(row);
        setIsOpenForm(true);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell >STT</TableCell>
                        <TableCell align="center">Tên bãi đỗ xe</TableCell>
                        <TableCell align="center">Longitude</TableCell>
                        <TableCell align="center">Latitude</TableCell>
                        <TableCell align="center">Slot trống ô tô</TableCell>
                        <TableCell align="center">Slot trống xe máy</TableCell>
                        <TableCell align="center">Slot trống xe đạp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rows).map((row, index) => (
                        <TableRow key={row.id} style={{ height: 80}}>
                            <TableCell component="th" scope="row">
                                {page*rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell align="center">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.longitude}
                            </TableCell>
                            <TableCell align="center">
                                {row.latitude}
                            </TableCell>
                            <TableCell align="center">
                                {row.available_spaces.car}
                            </TableCell>
                            <TableCell align="center">
                                {row.available_spaces.motorbike}
                            </TableCell>
                            <TableCell align="center">
                                {row.available_spaces.bicycle}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => deleteParkingLots(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => openForm(row)}>
                                    <BuildIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 80 * emptyRows }}>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow style={{ height: 80}}>
                        <TableCell>Rows Per Page</TableCell>
                        <TableCell>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel></InputLabel>
                                    <Select
                                        sx = {{ width : 100 }}
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={moveFirstPage}>
                                <SkipPreviousIcon />
                            </IconButton>
                            <IconButton onClick={moveBeforePage}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <IconButton onClick={moveNextPage}>
                                <NavigateNextIcon />
                            </IconButton>
                            <IconButton onClick={moveLastPage}>
                                <SkipNextIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <UpdateParkingLotsForm open={isOpenForm} close={closeForm} parkingLot={updateParkingLot} onUpdateParkingLot={onUpdateParkingLot}/>
            
        </TableContainer>
    );
}