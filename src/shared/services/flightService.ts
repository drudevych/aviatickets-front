import IFlight from '../../flights-page/interfaces/IFlight'

export const flightService = {

    getFlights: async (from:string, destination: string): Promise<IFlight[]> => {
        return await fetch(`https://mrpzlab-api.herokuapp.com/api/v1/flights?from=${from}&destination=${destination}`, {
            method: 'GET',
            headers: {
                'Authorization':`${localStorage.getItem('jwt')}`
              }
        }).then(res => res.json())
        .then(data => data)
    }

}