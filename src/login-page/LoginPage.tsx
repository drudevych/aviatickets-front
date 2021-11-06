import { Typography, Container, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { userService } from '../shared/services/userService';

export interface ILoginPageProps{

}

const LoginPage = (props: ILoginPageProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false)

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if(email !== '' && password !== '')
        {
            const authInfo = await userService.login(email, password);

            if(authInfo.jwt === null)
            {
                alert('Login failed')
            }else{
                localStorage.setItem('jwt', authInfo.jwt)
                localStorage.setItem('userId', authInfo.id)

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
        <>{isLoggedIn ? 
            <Redirect to="/home" /> 
            :
            <Container maxWidth="xs" >
                <Typography variant="h3" mt={30} fontFamily='Tahoma' align='center'>
                    Увійти
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
                        Увійти
                    </Button>
                    <Typography align='center'>
                        <Link to='/registration'>Зареєструватись</Link>
                    </Typography>                    
                </form>
            </Container>
            }           
        </>
    )
}

export default LoginPage;