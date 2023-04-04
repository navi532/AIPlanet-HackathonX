import React from 'react'
import Logo from './utils/logo.png'
import { NavLink } from 'react-router-dom';
export default function Navbar({ title, isLogged, setIsLogged }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" style={{ margin: '0rem 0rem 0rem 15rem', }}>
                        <img src={Logo} alt={title} />
                    </NavLink>
                    {isLogged ||
                        <div className="d-flex align-items-center justify-content-center">
                            <NavLink to='/login' >
                                <button className="btn btn-success shadow btn-lg m-3"> Login </button>
                            </NavLink>
                            <NavLink to='/signup' >
                                <button className="btn btn-success shadow btn-lg m-3"> Signup </button></NavLink>

                        </div>
                    }
                    {isLogged &&
                        <div className="d-flex align-items-center justify-content-center">
                            <button type="button" className="btn btn-danger shadow btn-lg m-3" onClick={() => {
                                localStorage.removeItem('access');
                                setIsLogged(false);
                            }}> Logout </button >
                        </div>
                    }

                </div>
            </nav >
        </>



    )
}
