import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';

export default function CreateParkingLots({ onAddParkingLot, initLongitude, initLatitude }) {
    const [name, setName] = useState();
    const [longitude, setLongitude] = useState(initLongitude);
    const [latitude, setLatitude] = useState(initLatitude);
    const [carSlot, setCarSlot] = useState(0);
    const [motorbikeSlot, setMotorBikeSlot] = useState(0);
    const [bicycleSlot, setBicyleSlot] = useState(0);

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeLongitude = (event) => {
        setLongitude(event.target.value);
    }

    const changeLatitude = (event) => {
        setLatitude(event.target.value);
    }

    const changeCarSlot = (event) => {
        setCarSlot(event.target.value);
    }

    const changeMotorbikeSlot = (event) => {
        setMotorBikeSlot(event.target.value);
    }

    const changeBicycleSlot = (event) => {
        setBicyleSlot(event.target.value);
    }

    const registerParkingLot = () => {
        let accessToken = Cookies.get('accessToken');
        let data = JSON.stringify({
            "name": name,
            "longitude": longitude,
            "latitude": latitude,
            "available_spaces": {
              "car": carSlot,
              "motorbike": motorbikeSlot,
              "bicycle": bicycleSlot
            }
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

        fetch(`${process.env.REACT_APP_BACKEND_URI}/parking-lots/`, requestOptions)
            .then((response) => {
                console.log('Response:', response);
                onAddParkingLot();
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
                <TextField id="name" label="Tên bãi đỗ xe" onChange={changeName}/>
                <TextField id="longitude" label="Longitude" defaultValue={initLatitude} onChange={changeLongitude}/>
                <TextField id="latitude" label="Latitude" defaultValue={initLatitude} onChange={changeLatitude}/>
                <TextField id="carSlot" label="Slot trống ô tô" defaultValue="0" onChange={changeCarSlot}/>
                <TextField id="motorbikeSlot" label="Slot trống xe máy" defaultValue="0" onChange={changeMotorbikeSlot}/>
                <TextField id="bicycleSlot" label="Slot trống xe đạp" defaultValue="0" onChange={changeBicycleSlot}/>
                <Button variant="contained" onClick={registerParkingLot}>
                    Register
                </Button>
            </Box>
        </>
    )
}

