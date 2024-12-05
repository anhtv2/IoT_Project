import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSignIn = () => {
        // Now you can use the 'username' and 'password' variables wherever needed.
        console.log('Username:', username);
        console.log('Password:', password);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        let dataAfterLogin = '';

        fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let jsonResult = JSON.parse(result);
                dataAfterLogin = jsonResult.access_token; // Lưu giá trị vào biến ngoài hàm
                Cookies.set('accessToken', dataAfterLogin, { expires: 7 }); //Cookie sẽ hết hạn sau 7 ngày
            })
            .then(() => console.log(dataAfterLogin))
            .then(() => console.log(typeof dataAfterLogin))
            .then(() => {
                if (typeof dataAfterLogin != 'undefined') {
                    navigate('/dashboard');
                }
            })
            .catch(error => console.log('error', error));
    };



    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                    <CustomTextField
                        id="username" variant="outlined" fullWidth
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                    <CustomTextField
                        id="password" type="password" variant="outlined" fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remeber this Device"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </>
    )
};

export default AuthLogin;
