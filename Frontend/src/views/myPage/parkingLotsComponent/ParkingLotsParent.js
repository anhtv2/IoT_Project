import React, { useState, useEffect, Fragment } from "react";
import CreateParkingLots from "./CreateParkingLots";
import ParkingLotsTable from "./ParkingLotsTable";
import Cookies from 'js-cookie';

export default function ParkingLotsParent() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [numberOfTotalPage, setNumberOfTotalPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Request the current position
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, (error) => {
              switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
                }
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
    }, []);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const moveFirstPage = () => {
        setPage(0);
    }

    const moveLastPage = () => {
        setPage(numberOfTotalPage - 1);
    }

    const moveBeforePage = () => {
        setPage(Math.max(page - 1, 0));
    }

    const moveNextPage = () => {
        let x = Math.min(page + 1, numberOfTotalPage - 1);
        setPage(x);
    }

    const getParkingLots = () => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/parking-lots/?page=${page + 1}&size=${rowsPerPage}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                try {
                    console.log(result);
                    setRows(result.items);
                    setNumberOfTotalPage(result.pages);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getParkingLots();
    }, [page, rowsPerPage]);

    const deleteParkingLots = (id) => {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BACKEND_URI}/parking-lots/` + id, requestOptions)
            .then((response) => {
                if (response.status !== 204) {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                }
                getParkingLots();
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <CreateParkingLots onAddParkingLot={getParkingLots} initLongitude={longitude} initLatitude={latitude}/>
            <ParkingLotsTable
                page={page} 
                rowsPerPage={rowsPerPage}
                rows={rows}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                moveFirstPage={moveFirstPage}
                moveLastPage={moveLastPage}
                moveBeforePage={moveBeforePage}
                moveNextPage={moveNextPage}
                deleteParkingLots={deleteParkingLots}
                onUpdateParkingLot={getParkingLots}
            ></ParkingLotsTable>
        </>
    )
}