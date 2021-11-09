import IFlight from '../interfaces/IFlight';
import { IBookingInfo } from './../interfaces/IBookingInfo';
import { IBookedFlight } from './../interfaces/IBookedFlight';

export const flightService = {

    getFlights: async (from:string, destination: string): Promise<IFlight[]> => {
        let url = 'https://mrpzlab-api.herokuapp.com/api/v1/flights';

        if(from !== '')
        {
            //todo for refactoring
            url += `?from=${from}`;

            if(destination !== '')
            {
                url += `&destination=${destination}`;
            }
        }

        return await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`
              }
        }).then(res => res.json())
        .then(data => data)
    },

    getFlightInfo: async (id: string): Promise<IFlight> => {
        return await fetch(`https://mrpzlab-api.herokuapp.com/api/v1/flights/${id}`, {
            method: 'GET',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`
              }
        }).then(res => res.json())
        .then(data => data)
    },

    bookFlight: async (flightId: string): Promise<Response | void> => {
        return await fetch(`https://mrpzlab-api.herokuapp.com/api/v1/bookings/`, {
            method: 'POST',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                'booking': {
                    'user_id': `${localStorage.getItem('userId')}`,
                    'flight_id': flightId
                }               
            }) 
        }).then(res => res)
    },

    getBookingsInfo: async (): Promise<IBookedFlight[]> => {
        const flights: IBookedFlight[] = [];

        await fetch(`https://mrpzlab-api.herokuapp.com/api/v1/bookings/`, {
            method: 'GET',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },       
            }).then(res => res.json())
            .then(async (data: IBookingInfo[]) => {
                    for(const item of data){
                        const flight = await flightService.getFlightInfo(item.flight_id);
                        flights.push({
                            id: item.id,
                            flight: flight                    
                        });
                    }
                }
            )

        return flights;
    },

    cancelBooking: async (bookingId: string): Promise<Response | void> => {
        return await fetch(`https://mrpzlab-api.herokuapp.com/api/v1/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              } 
        }).then(res => res)
    }
}