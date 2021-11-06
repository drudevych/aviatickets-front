import { MenuItem, Paper, Select, Typography, Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router'; 
import { flightService } from '../shared/services/flightService'
import IFlight from '../flights-page/interfaces/IFlight'

interface MatchParams  {
    id: string;
}

export interface IFlightInfoProps extends RouteComponentProps<MatchParams >{

}

const FlightInfo = (props: IFlightInfoProps) => {

    const [seats, setSeats] = useState<number[]>([]);
    const [flight, setFlight] = useState<IFlight>();

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
    }

    return(
        flight === undefined ? <></> :
        <>
            <Container>
                <Paper elevation={3} >
                    <Typography variant="h3" component="h3" mt={30} fontFamily='Tahoma' align='center'>
                        {flight.from}
                    </Typography>
                    <Button onClick={onBookClick}>
                        Забронювати
                    </Button>               
                </Paper>
            </Container>
        </>
    )
}

export default FlightInfo;