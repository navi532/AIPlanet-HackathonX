import React, { useState } from 'react'
import Box from './utils/Box'
import axios from 'axios'
import { useNavigate } from 'react-router';

export default function Signup({ showAlert }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        user_type: "PARTICIPANT"
    });
    const navigate = useNavigate();

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

        axios.post("http://127.0.0.1:8000/api/auth/register/", data).then(resp => {

            showAlert('success', "Success", "User Account Registed");
            navigate('/login');
        }).catch(err => {
            let message = "";
            for (const [key, value] of Object.entries(err.response.data)) {
                message = message + `${key.toUpperCase()} : ${Array.isArray(value) ? value[0] : value}\n`;
            }
            showAlert('danger', "Error", message);
        })

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
                <h3 className='text-center fw-300'>Signup Page</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" onChange={handleChange} name='name' value={user.name} required />

                    </div>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} name='email' value={user.email} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='password' value={user.password} required />
                    </div>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='confirm_password' value={user.confirm_password} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Select" className="form-label">User Type</label>
                        <select id="Select" className="form-select" name='user_type' onChange={handleChange}>
                            <option value="HOST" selected={user.user_type === 'HOST'}>Host</option>
                            <option value="PARTICIPANT" selected={user.user_type === 'PARTICIPANT'}>Participant</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg shadow" >Submit</button>
                </form>
            </Box>

        </>


    )
}
