import React, { useState } from 'react'
import Box from './utils/Box'
import axios from 'axios'
import { useNavigate, Navigate } from "react-router-dom";


export default function Login({ showAlert, isLogged, setIsLogged }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {


        axios.post("http://127.0.0.1:8000/api/auth/login/", {
            'email': email,
            'password': password
        }).then(resp => {
            localStorage.setItem('access', resp.data.access);
            setIsLogged(true);
            showAlert('success', "Success", "User Logged In");
            navigate('/');

        }).catch(err => {
            showAlert('danger', "Failed", err.response?.data?.detail ?? "Server not responding. Try again!");
        })

    };
    if (isLogged) {

        return <Navigate to="/" />
    }

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
                <h3 className='text-center fw-300'>Login Page</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} value={email} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} value={password} required />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg shadow" >Submit</button>
                </form>
            </Box>

        </>


    )
}
