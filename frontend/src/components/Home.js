import React from 'react'
import { useState, useEffect } from 'react';
import { checkUser } from '../utils';
import { Link } from 'react-router-dom';
import Spinner from './utils/Spinner';
import bulbicon from './utils/3dicon.png';
import axios from 'axios';

export default function Home() {
    const [user, setUser] = useState('HOST');
    const [isAll, setIsAll] = useState(true);
    const [sort, setSort] = useState('newest');
    const [hackathons, setHackathons] = useState([]);
    const [isLoading, setLoading] = useState(false);



    const getHackathons = async () => {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        };
        try {
            const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/view?me=${!isAll}&sortby=${sort}`, config);
            setHackathons(resp.data);

        }
        catch {
            setHackathons([]);

        }
        setLoading(false);
    }

    useEffect(() => {
        async function runOnMount() {
            const usertype = await checkUser();
            setLoading(true);
            setUser(usertype);
            let result = [];
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            };
            try {
                const resp = await axios.get('http://127.0.0.1:8000/api/hackathon/view?sortyby=newest', config);
                result = resp.data;
            }
            catch {
                result = [];
            }
            setLoading(false);
            setHackathons(result);
        }
        runOnMount();

    }, [])



    return (
        <>
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{
                    backgroundColor: "#003145",
                    height: "45%",
                    color: 'white'
                }}>
                    <div className="col-8 p-4">
                        <div className="container pt-4" style={{ margin: '0rem 0rem 0rem 12rem', }}>
                            <h2 className='m-4 fs-1'>Hackathon Submission</h2>
                            <p className='m-4 fs-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, suscipit. Nemo quaerat dolor harum beatae natus molestias, odit provident, autem vero quod ipsa itaque ipsam neque laborum tempora asperiores unde?</p>

                            {user === 'HOST' &&
                                <Link to='/hackathon/create'>
                                    <button className="btn btn-lg btn-success shadow m-4"> Create hackathon </button>
                                </Link>
                            }

                        </div>

                    </div>
                    <div className="col-4 px-4">
                        <img src={bulbicon} alt="" style={{ maxHeight: '85%', marginLeft: '12rem' }} />
                    </div>


                </div>

                <div className="row">
                    {isLoading && <Spinner />}
                    {isLoading ||
                        <>
                            <nav className='m-4'>
                                <ul className="nav nav-underline justify-content-center">
                                    <li className="nav-item ">
                                        <button className={"nav-link text-black " + (isAll && "active")} onClick={() => {
                                            setIsAll(true);
                                            setHackathons([]);
                                            setLoading(true);
                                            getHackathons();
                                        }}>All Submissions</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={"nav-link text-black " + (!isAll && "active")} onClick={() => {
                                            setIsAll(false);
                                            setHackathons([]);
                                            setLoading(true);
                                            getHackathons();
                                        }}>{user === "HOST" ? "Created by Me" : "Enrolled Hackathons"}</button>
                                    </li>
                                    <form className="d-flex justify-content-end" role="search">
                                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => {

                                            setSort(e.target.value);
                                            getHackathons();
                                        }}>
                                            <option value="oldest" selected={sort === 'newest'}>Order By Oldest</option>
                                            <option value="newest" selected={sort === 'newest'}>Order By Newest</option>
                                        </select>
                                    </form>
                                </ul>

                            </nav>
                            <div className="container m-4">
                                <div className="row row-cols-1 row-cols-md-3 g-4 m-2">

                                    {hackathons.map(hackathon => {
                                        return (


                                            <div key={hackathon.title} className="col">
                                                <div className="card h-100 shadow">
                                                    <div className="row g-0">
                                                        <div className="col-md-4">
                                                            <img src={`http://localhost:8000${hackathon.hackathon_image}`} className="img-fluid rounded" alt="..." />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{hackathon.title} <Link to={`/hackathon/${hackathon.title}`} className='stretched-link'></Link></h5>
                                                                <p className="card-text">{hackathon.description}</p>
                                                                <p className="card-text"><small className="text-body-secondary">
                                                                    {
                                                                        !isAll && user === 'HOST'
                                                                            ? `Created on ${new Date(hackathon.created_at).toLocaleString()}`
                                                                            : `Starts on ${new Date(hackathon.start_date).toLocaleString()}`
                                                                    }
                                                                </small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}



                                </div>

                            </div>
                        </>
                    }

                </div>

            </div >

        </>
    )
}
