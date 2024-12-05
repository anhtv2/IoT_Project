import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';

export default function UpdateParkingLotsForm({
    open,
    close,
    parkingLot,
    onUpdateParkingLot
}) {
    const [name, setName] = useState(parkingLot?.name);
    const [longitude, setLongitude] = useState(parkingLot?.longitude);
    const [latitude, setLatitude] = useState(parkingLot?.latitude);
    const [carSlot, setCarSlot] = useState(parkingLot?.available_spaces.car);
    const [motorbikeSlot, setMotorBikeSlot] = useState(parkingLot?.available_spaces.motorbike);
    const [bicycleSlot, setBicyleSlot] = useState(parkingLot?.available_spaces.bicycle);
    
    const changeName = (event) => {
        console.log(event.target.value);
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


    const updateParkingLot = () => {
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
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };
        fetch(`${process.env.REACT_APP_BACKEND_URI}/parking-lots/${parkingLot?.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                close();
                onUpdateParkingLot();
            })
            .catch(error => console.log('error', error));
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Thông tin bãi đỗ xe </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the information you want to edit
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Name" fullWidth defaultValue={parkingLot?.name} onChange={changeName}/>
                <TextField margin="dense" id="longitude" label="Longitude" fullWidth defaultValue={parkingLot?.longitude} onChange={changeLongitude}/>
                <TextField margin="dense" id="latitude" label="Latitude" fullWidth  defaultValue={parkingLot?.latitude} onChange={changeLatitude}/>
                <TextField margin="dense" id="carSlot" label="Slot trống ô tô" fullWidth defaultValue={parkingLot?.available_spaces?.car} onChange={changeCarSlot}/>
                <TextField margin="dense" id="motorbikeSlot" label="Slot trống xe máy" fullWidth defaultValue={parkingLot?.available_spaces?.motorbike} onChange={changeMotorbikeSlot}/>
                <TextField margin="dense" id="bicycleSlot" label="Slot trống xe đạp" fullWidth defaultValue={parkingLot?.available_spaces?.bicycle} onChange={changeBicycleSlot}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={updateParkingLot}>Save</Button>
                <Button onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}