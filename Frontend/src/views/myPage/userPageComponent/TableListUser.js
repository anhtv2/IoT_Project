import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TableCell, TableContainer, Table, Paper, TableHead, TableRow, TableBody } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAdmin } from 'src/store/CheckAdminSlice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { json } from 'react-router';

const TableListUser = () => {
    const isAdmin = useSelector(selectAdmin);
    const [users, setUsers] = useState([]);
    const [timeLoad, setTimeLoad] = useState(1);
    let data = [1, 2];

    useEffect(() => {
        console.log(isAdmin.isAdmin)
        if (isAdmin.isAdmin === 1) {
            console.log(typeof users);
            console.log(typeof data);
            let accessToken = Cookies.get('accessToken');
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + accessToken);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_BACKEND_URI}/users`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    try {
                        console.log(result);
                        setUsers(result.items);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }, [timeLoad]);

    const deleteUser = (userId) => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/users/` + userId, requestOptions)
            .then((response) => {
                console.log('Response:', response);
            });
    }

    const grantAdmin = (userId) => {
        let accessToken = Cookies.get('accessToken');
        console.log(JSON.stringify({is_superuser: true}));

        console.log('Bearer ' + accessToken);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({is_superuser: true}),
            redirect: 'follow',
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/users/` + userId, requestOptions)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
            setTimeLoad(timeLoad+1);
          })
          .catch(error => {
            console.error('Error during request:', error);
            // In ra nội dung lỗi chi tiết
            return error.message;
          })
          .then(errorMessage => {
            console.log('Error message from server:', errorMessage);
          });
    }

    const cancelAdmin = (userId) => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({is_superuser: false}),
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/users/` + userId, requestOptions)
            .then((response) => {
                console.log('Response:', response);
                setTimeLoad(timeLoad+1);
            });
    }

    return (
        <div>
            {isAdmin.isAdmin ? <div>
                <h2>Danh sách user</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>username</TableCell>
                                <TableCell>id</TableCell>
                                <TableCell>Active?</TableCell>
                                <TableCell>Admin?</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.is_active.toString()}</TableCell>
                                    <TableCell>{user.is_superuser.toString()}</TableCell>
                                    <TableCell>{user.created_at}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteUser(user.id)} >
                                            Delete User
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" startIcon={<CheckIcon />} onClick={() => grantAdmin(user.id)} >
                                            Grant Admin
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" startIcon={<CloseIcon />} onClick={() => cancelAdmin(user.id)} >
                                            Cancel Admin
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> : <p>Bạn phải là admin mới xem được danh sách người dùng</p>}
        </div>

    );
};

export default TableListUser;




/* 
<div>
    <h2>Danh sách user</h2>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>username</TableCell>
                    <TableCell>id</TableCell>
                    <TableCell>Active?</TableCell>
                    <TableCell>Admin?</TableCell>
                    <TableCell>Created At</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.is_active.toString()}</TableCell>
                        <TableCell>{user.is_superuser.toString()}</TableCell>
                        <TableCell>{user.created_at}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</div>
*/