import React, { useEffect, useState } from 'react';
import IFlight from './interfaces/IFlight'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { flightService } from '../shared/services/flightService'
import FlightInfo from '../flight-info-page/FlightInfo';
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

    return(
        <>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align="center">Авіакомпанія</TableCell> */}
                            {/* <TableCell align="center">Кількість пересадок</TableCell> */}
                            {/* <TableCell align="center">Кількість вільних місць</TableCell> */}
                            {/* <TableCell align="center">Тривалість польоту</TableCell>
                            <TableCell align="center">Час вильоту</TableCell>
                            <TableCell align="center">Ціна</TableCell> */}
                            <TableCell align="center">Звідки</TableCell>
                            <TableCell align="center">Куди</TableCell>
                            <TableCell align="center">Час відправлення</TableCell>
                            <TableCell align="center">Час прибуття</TableCell>                        
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {flights.map((flight: IFlight) => (
                        <TableRow
                        key={flight.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell align="center">{flight.companyName}</TableCell>
                            <TableCell align="center">{flight.stopsNumber}</TableCell>
                            <TableCell align="center">{flight.seats}</TableCell>
                            <TableCell align="center">{flight.flightDuration}</TableCell>
                            <TableCell align="center">{flight.flightTime.toLocaleTimeString()}</TableCell>
                            <TableCell align="center">{flight.price}</TableCell> */}
                            <TableCell align="center">{flight.from}</TableCell>
                            <TableCell align="center">{flight.destination}</TableCell>
                            <TableCell align="center">{flight.departure}</TableCell>
                            <TableCell align="center">{flight.arrival}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => onSelectClick(flight.id)}>Обрати</Button>
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