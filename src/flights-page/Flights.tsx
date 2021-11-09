import React, { useEffect, useState } from 'react';
import IFlight from '../shared/interfaces/IFlight'
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { flightService } from '../shared/services/flightService'
import { useHistory } from 'react-router-dom';

export interface IFlightsProps{
    from: string;
    destination: string;
    clearState: () => void;
}

const Flights = (props: IFlightsProps) => {
    
    const {from, destination, clearState} = props;

    const history = useHistory();

    const [flights, setFlights] = useState<IFlight[]>([]);

    const fetchData = async () => {
        const data = await flightService.getFlights(from, destination);
        setFlights(data);
        clearState();
    }

    useEffect(() => {
        fetchData();        
    }, []) 

    const onSelectClick = (id: number) => {
        history.push(`/flights/${id}`)
    }

    console.log(flights)

    return(
        <>
             <TableContainer>
                <Typography variant="h3" component="h3" mt={5} fontFamily='Comfortaa' color='#316984' align='center'>
                    Результати пошуку
                </Typography>
                <Table sx={{ width: '74%', marginLeft: '13%', marginTop: '40px', backgroundColor: 'rgba(243, 243, 255, 0.9)', boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.6)', borderRadius: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                                    Звідки
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                                    Куди
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                                    Час відправлення
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h5" component="h5" fontFamily='Comfortaa' color='#316984' align='center'>
                                    Час прибуття
                                </Typography>    
                            </TableCell>                        
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {flights.map((flight: IFlight) => (
                        <TableRow
                        key={flight.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {flight.from}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {flight.destination}
                                </Typography>    
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {new Date(flight.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>   
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {new Date(flight.arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}    
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => onSelectClick(flight.id)}>
                                    <Typography fontFamily='Comfortaa' align='center'>
                                        Обрати    
                                    </Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Flights;