import {  Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/lab';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export interface IHomeProps {
  setFrom: (from: string) => void;
  setDestination: (destination: string) => void;
}

const Home = (props: IHomeProps) => {

  const { setFrom , setDestination} = props;

  const history = useHistory();

  const [dateValue, setDateValue] = useState<Date>(new Date());

  const onFromChange = (event: any) => {
    setFrom(event.target.value as string);
  }

  const onDestinationChange = (event: any) => {
    setDestination(event.target.value as string);
  }

  const onBookingsClick = () => {    
    history.push(`/bookings`)
  }

  const onExitClick = () => {
    localStorage.clear();
    history.push(`/login`)
  }

  const onSearchClick = () => {
    history.push("/flights");
  }

    return(
        <>
         <Typography align='right'>
            <Button sx={{margin: '15px'}} onClick={onBookingsClick}>
              <Typography fontFamily='Comfortaa' color='#316984'>
                Мої бронювання
                </Typography>              
              </Button>
            <Button sx={{margin: '15px'}} onClick={onExitClick}>
              <Typography fontFamily='Comfortaa' color='#316984'>
                  Вихід
              </Typography>               
            </Button>
          </Typography>     
        
        <Stack spacing={6} justifyContent='center' alignItems="center">
          <Typography variant="h3" component="h3" mt={'12%'} fontFamily='Comfortaa' color='#316984'>
            Пошук авіабілетів
          </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item sx={{ width: '25%' }}>
                <TextField label="Звідки" fullWidth onChange={onFromChange}></TextField>
                {/* <Autocomplete renderInput={(params) => <TextField {...params} label="Звідки" />} options={[]}/> */}
              </Grid>
              <Grid item sx={{ width: '25%' }}>
              <TextField label="Куди" fullWidth onChange={onDestinationChange}></TextField>
                {/* <Autocomplete fullWidth renderInput={(params) => <TextField {...params} label="Куди" />} options={[]}/> */}
              </Grid>
              <Grid item sx={{ width: '10%' }}>
                  <DatePicker 
                      label="Дата подорожі"
                      value={dateValue}
                      onChange={(newValue) => {setDateValue(newValue as Date);
                    }}
                  renderInput={(params) => <TextField {...params} />}/>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={onSearchClick}>Пошук</Button>
              </Grid>
              </Grid>
        </Stack>
        
        </>
    );
}

export default Home;