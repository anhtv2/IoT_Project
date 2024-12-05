import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TableMyVehicle() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [numberOfTotalRow, setNumberOfTotalRow] = useState(0);
    const [numberOfTotalPage, setNumberOfTotalPage] = useState(0);
    const [timeLoad, setTimeLoad] = useState(1);
    //Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const moveFirstPage = () => {
        setPage(0);
        setTimeLoad(timeLoad+1);
    }

    const moveLastPage = () => {
        setPage(numberOfTotalPage-1);
        setTimeLoad(timeLoad+1);
    }

    const moveBeforePage = () => {
        setPage(Math.max(page-1,0));
        setTimeLoad(timeLoad+1);
    }

    const moveNextPage = () => {
        let x = Math.min(page+1,numberOfTotalPage-1);
        console.log(x);
        setPage(x);
        setTimeLoad(timeLoad+1);
    }

    useEffect(() => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/vehicles/?page=${page + 1}&size=${rowsPerPage}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                try {
                    console.log(result);
                    setRows(result.items);
                    setNumberOfTotalPage(result.pages);
                    setNumberOfTotalRow(result.total);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .catch(error => console.log('error', error));
    }, [timeLoad, page, rowsPerPage]);


    const deleteVehicle = (id) => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/vehicles/` + id, requestOptions)
            .then((response) => {
                console.log('Response:', response);
                setTimeLoad(timeLoad+1);
            });
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell >STT</TableCell>
                        <TableCell align="center">Biển số xe</TableCell>
                        <TableCell align="center">Loại xe</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rows).map((row, index) => (
                        <TableRow key={row.id} style={{ height: 80}}>
                            <TableCell component="th" scope="row">
                                {page*rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell align="center">
                                {row.license_plate}
                            </TableCell>
                            <TableCell align="center">
                                {row.vehicle_type}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => deleteVehicle(row.id)}>
                                    <DeleteIcon />
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
        </TableContainer>
    );
}