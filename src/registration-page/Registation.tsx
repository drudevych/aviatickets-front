import { Typography, Container, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { userService } from './../shared/services/userService';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export interface IRegistrationProps{

}

const Registration = (props: IRegistrationProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [isLoggedIn, setLoggedIn] = useState(false)

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if(email !== '' && password !== '')
        {
            const jwt = await userService.register(email, password);

            if(jwt === null)
            {
                alert('Registration failed')
            }else{
                localStorage.setItem('jwt', jwt)

                setLoggedIn(true);
            }
        }
    }

    const onEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    return(
        <>
        {isLoggedIn ? 
            <Redirect to="/home" /> 
            :
            <Container maxWidth="sm" >
                <Typography variant="h3" mt={'60%'} fontFamily='Comfortaa' color='#316984' align='center'>
                    Зареєструватись
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Email"
                        fullWidth
                        required
                        onChange={onEmailChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        onChange={onPasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Зареєструватись
                    </Button>
                    <Typography align='center'>
                        <Link to='/login'>Увійти</Link>
                    </Typography> 
                </form>
            </Container>
            }
        </>
    )
}

export default Registration;