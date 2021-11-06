import IAuthInfo from "../interfaces/IAuthInfo";

export const userService = {

    register: async (email: string, password: string): Promise<string | null> => {
        return await fetch('https://mrpzlab-api.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                'user': {
                    'email': email,
                    'password': password
                }               
            })
        }).then(res => {
            return res.headers.get('authorization');
        } )
    },

    login: async (email: string, password: string): Promise<IAuthInfo> => {
        const authInfo : IAuthInfo = {
            id: '',
            jwt: ''
        }; 

        await fetch('https://mrpzlab-api.herokuapp.com/users/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                'user': {
                    'email': email,
                    'password': password
                }               
            })
        }).then(res => {
            authInfo.jwt = res.headers.get('authorization');
            return res.json(); 
        } ).then(body => authInfo.id = body.id)

        return authInfo;
    },
}