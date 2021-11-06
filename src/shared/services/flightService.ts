import IFlight from '../../flights-page/interfaces/IFlight'

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
    }
}