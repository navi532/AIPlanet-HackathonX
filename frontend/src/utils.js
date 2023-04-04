import axios from 'axios';



/*Checks If current token is valid or not,
If valid 
:return true, does nothing

Tries to refresh the token 
-if refresh is not null
    :fetch token sucessfully and set new access token and return true
resettoken()
return false*/

export function verifyToken(access) {

    return axios.post('http://127.0.0.1:8000/api/auth/token/verify/', {
        'token': access
    }).then(resp => {

        return true;
    }).catch(err => {
        return false;
    });

}

export function checkUser() {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    };
    return axios.get('http://127.0.0.1:8000/api/hackathon/participant/', config).then(resp => {

        return 'PARTICIPANT';
    }).catch(err => {
        return 'HOST';
    });



}


