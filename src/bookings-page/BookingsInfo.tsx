import React, { useEffect, useState } from 'react';
import { flightService } from '../shared/services/flightService';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IBookedFlight } from './../shared/interfaces/IBookedFlight';

export interface IBookingsInfoProps{
}

const BookingsInfo = (props: IBookingsInfoProps) => {

    const [bookings, setBookings] = useState<IBookedFlight[]>([]);

    const fetchData = async () => {
        const data = await flightService.getBookingsInfo();
        setBookings(data);
    };

    const onCancelClick = async (id: string) => {
        await flightService.cancelBooking(id);
        setBookings(bookings.filter(item => item.id !== id))
    };

    useEffect(() => {
        fetchData();      
    }, []) 

    return(
        <>
             <TableContainer>
                <Typography variant="h3" component="h3" mt={5} fontFamily='Comfortaa' color='#316984' align='center'>
                    Ваші бронювання
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
                    {bookings.map((booking: IBookedFlight) => (
                        <TableRow
                        key={booking.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {booking.flight.from}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {booking.flight.destination}
                                </Typography>    
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {new Date(booking.flight.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>   
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontFamily='Comfortaa' color='#316984' align='center'>
                                    {new Date(booking.flight.arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}    
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => onCancelClick(booking.id)}>
                                    <Typography fontFamily='Comfortaa' align='center'>
                                        Скасувати    
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

export default BookingsInfo;