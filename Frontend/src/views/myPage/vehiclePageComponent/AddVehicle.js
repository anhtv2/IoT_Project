import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';

export default function AddVehicle() {
    const [licensePlate, setLicensePlate] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const changeLicensePlate = (event) => {
        console.log(event.target.value);
        setLicensePlate(event.target.value);
    }

    const changeVehicleType = (event) => {
        setVehicleType(event.target.value);
    }

    const registerVehicle = () => {
        let accessToken = Cookies.get('accessToken');
        let data = JSON.stringify({
            "license_plate" : licensePlate,
            "vehicle_type" : vehicleType
        });
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/vehicles/`, requestOptions)
            .then((response) => {
                console.log('Response:', response);
            });
    }

    return (
        <>
            <div>Enter vehicle information you want to register</div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="standard-basic" label="Biển số xe" variant="standard" onChange={changeLicensePlate}/>
                <TextField id="standard-basic" label="Loại xe" variant="standard" onChange={changeVehicleType}/>
                <Button variant="contained" onClick={registerVehicle}>
                    Register
                </Button>
            </Box>
        </>
    )
}
