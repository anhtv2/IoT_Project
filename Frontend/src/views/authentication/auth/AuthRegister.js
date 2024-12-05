import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const signUp = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Password:', confirmPassword);

        if (password !== confirmPassword) {
            alert('Password and confirm password do not match');
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const jsonBody = JSON.stringify({ username, password });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: jsonBody,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_BACKEND_URI}/users/`, requestOptions)
                .then(response => {
                    if (response.status === 201) {
                        alert('Sign up successfully');
                        navigate('/auth/login');
                    } else {
                        console.log(response);
                        alert(response.detail);
                    }
                }).catch(error => console.log('error', error));
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={username}
                        onChange={handleUsernameChange} />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={password}
                        onChange={handlePasswordChange} type="password" />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='confirm_password' mb="5px" mt="25px">Confirm Password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth value={confirmPassword}
                        onChange={handleConfirmPasswordChange} type="password" />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth onClick={signUp}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    )
};

export default AuthRegister;
