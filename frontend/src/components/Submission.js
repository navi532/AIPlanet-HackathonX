import React, { useState } from 'react'
import Box from './utils/Box'
import axios from 'axios'

export default function Submission({ showAlert }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        user_type: ""
    });


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };


    const handleRegister = () => {

        if (user.password !== user.confirm_password) {
            showAlert('danger', 'Password Mismatch', "Password and Confirm Password doesnt match")
            return;
        }


        const data = {
            'email': user.email,
            'password': user.password,
            'name': user.name,
            'user_type': user.user_type
        }
        console.log(data);
        // axios.post("http://127.0.0.1:8000/api/auth/register/", ).then(resp => {
        //         updateToken(resp.data);
        //         showAlert('success', "Success", "User Logged In");
        //     }).catch(err => {
        //         showAlert('danger', err.response.statusText, err.response.data.detail);
        //     })

    };

    return (
        <>

            <Box customstyle={{
                position: 'absolute',
                width: '40em',
                height: 'auto',
                zIindex: "15",
                top: '50%',
                left: '50%',
                transform: "translate(-45%,-40%)"
            }}>
                <h3 className='text-center fw-300'>Your Submission</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} name='email' value={user.email} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='password' value={user.password} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='confirm_password' value={user.confirm_password} required />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg shadow" >Submit</button>
                </form>
            </Box>

        </>


    )
}
