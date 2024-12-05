import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ProfileTable() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const toDo = async () => {
            let accessToken = Cookies.get('accessToken');
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + accessToken);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users/me`, requestOptions)
            const data = await response.json();
            console.log(data);
            setProfile(data);
            return data;
        }
        setProfile(toDo());
    }, []);
    return (
        <>
            <div>ProfileTable</div>
            <List>
                <ListItem disablePadding>
                    <ListItemText>username: {profile.username}</ListItemText>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText>create at: {profile.created_at}</ListItemText>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText>is active: {profile.is_active ? 'true' : 'false'}</ListItemText>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText>is admin: {profile.is_superuser ? 'true' : 'false'}</ListItemText>
                </ListItem>
            </List>
        </>
    )
}
