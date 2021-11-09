import { Paper, Typography, Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router'; 
import { flightService } from '../shared/services/flightService'
import IFlight from '../shared/interfaces/IFlight'

interface MatchParams  {
    id: string;
}

export interface IFlightInfoProps extends RouteComponentProps<MatchParams>{

}

const FlightInfo = (props: IFlightInfoProps) => {

    const [flight, setFlight] = useState<IFlight>();

    const history = useHistory();

    const { id } = props.match.params;

    const fetchData = async () => {
        const data = await flightService.getFlightInfo(id);
        setFlight(data);
    }

    useEffect(() => {
        fetchData();        
    }, [])

    const onBookClick = async () => {
        const response = await flightService.bookFlight(id);
        console.log(response)
        history.push(`/bookings`)
    }

    return(
        flight === undefined ? <></> :
        <>
            <Container>
                <Paper elevation={3} sx={{backgroundColor: 'rgba(243, 243, 255, 0.9)', boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.6)', borderRadius: 1}}>
                    <Typography variant="h3" component="h3" mt={'25%'} pt={'10px'} fontFamily='Comfortaa' color='#316984' align='center'>
                        {flight.from} - {flight.destination}
                    </Typography>
                    <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                        {new Date(flight.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(flight.arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Typography>
                    <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                        <Button onClick={onBookClick} variant="contained" sx={{margin: '20px'}}>
                            Забронювати
                        </Button>
                    </Typography>               
                </Paper>
            </Container>
        </>
    )
}

export default FlightInfo;