import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { checkUser } from '../utils';
import { Link } from 'react-router-dom';
export default function DetailPage({ showAlert }) {

    const [hackathon, setHackathon] = useState(null);
    const [action, setAction] = useState('');
    const [user, setUser] = useState('HOST');
    const [enrolled, setEnrolled] = useState(false);
    const [showsubmission, setShowSubmission] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    const { title } = useParams();

    useEffect(() => {
        async function runOnMount() {
            const usertype = await checkUser();

            setUser(usertype);
            let result = [], enroll = false;
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            };
            try {
                const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/view?title=${title}`, config);
                result = resp.data[0];
            }
            catch {
                result = {};
            }

            try {
                const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/view?title=${title}&me=true`, config);
                enroll = resp.data.length > 0 && usertype === 'PARTICIPANT';
            }
            catch {
                enroll = false;
            }
            setEnrolled(enroll);
            setHackathon(result);
        }
        runOnMount();

    }, [title]);

    useEffect(() => {
        const getSubmissions = async () => {
            setSubmissions([]);

            if (!showsubmission)
                return;

            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            };
            try {
                const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/submissions/${title}`, config);
                setSubmissions(resp.data);

            }
            catch {
                setSubmissions([]);

            }
        }
        getSubmissions();

    }, [showsubmission, title]);

    const performAction = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        };
        try {
            if (action === 'delete') {
                await axios.delete(`http://127.0.0.1:8000/api/hackathon/delete/${title}/`, config);


                showAlert('danger', "Warning", `Hackathon {title} has been deleted!`);
                setHackathon(null);
                setSubmissions([]);
            }
            else if (action === 'enroll') {
                await axios.post(`http://127.0.0.1:8000/api/hackathon/enroll/`, { hackathon: title }, config);

                setEnrolled(true);
                showAlert('success', "Application Status", "You have been enrolled to hackathon");
            }



        }
        catch (error) {
            let message = "";
            for (const [key, value] of Object.entries(error.response.data)) {
                message = message + `${key.toUpperCase()} : ${Array.isArray(value) ? value[0] : value}\n`;
            }
            showAlert('danger', "Error", message);
        }

    }

    const submission_url = (submission) => {
        const prefix = 'http://localhost:8000'
        if (submission.hasOwnProperty('file_submission'))
            return prefix + submission.file_submission;



        if (submission.hasOwnProperty('link_submission'))
            return submission.link_submission;

        return prefix + submission.image_submission;
    }


    return (
        <>
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{
                    backgroundColor: "#003145",
                    height: "45%",
                    color: 'white'
                }}>
                    <div className="col-7 p-4">
                        <div className="container pt-4" style={{ padding: '0rem 0rem 0rem 12rem', }}>


                            <img style={{ maxHeight: '20vh' }} className='rounded shadow' src={`http://localhost:8000${hackathon?.hackathon_image}`} alt={title} />
                            <span className='mx-4 display-3 fw-medium'>{title}</span>

                            <div className="row my-2">
                                <p >{hackathon?.description?.slice(0, 200) + " ..."}</p>
                            </div>
                            <span className='my-3 p-3 badge bg-dark-subtle text-black'>STARTS {new Date(hackathon?.created_at)?.toLocaleString()}</span>



                        </div>

                    </div>
                    <div className="col-5 px-4">
                        <div className="container pt-4 " style={{ padding: '10rem 0rem 4rem 12rem', }}>

                            <div className="row p-4">
                                <div className="d-grid gap-2 col-8 mx-auto">
                                    {
                                        user === 'HOST' &&
                                        <Link to={`/hackathon/${title}/edit`} type="button" className="m-4 btn btn-outline-light btn-lg "><i className="bi-pencil"> </i>  Edit Hackathon Details  </Link>
                                    }
                                    {
                                        (user === 'PARTICIPANT' && enrolled)
                                        &&
                                        <Link to={`/submission/${title}/edit`} type="button" className="m-4 btn btn-outline-light btn-lg "><i className="bi-pencil"> </i> Edit Submission  </Link>

                                    }
                                    {
                                        (user === 'PARTICIPANT' && !enrolled)
                                        &&
                                        <button type="button" className="my-2 btn btn-outline-light btn-lg " data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setAction('enroll'); }}><i className="bi-door-open" > </i> Enroll To Hackathon</button>
                                    }
                                    {user === 'HOST' &&
                                        <>

                                            <button type="button" className="my-2 btn btn-outline-light btn-lg " data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setAction('delete'); }}><i className="bi-x-circle-fill"> </i> Delete Hackathon</button>



                                            <button type="button" className="my-2 btn btn-outline-light btn-lg " onClick={() => { setShowSubmission(b => !b); }}><i className="bi-view-list"> </i> {!showsubmission ? "Show All Submissions" : "Hide Submissions"}</button>

                                        </>
                                    }


                                </div>



                            </div>



                        </div>
                    </div>


                </div>

                <div className="row">
                    {
                        !showsubmission ?
                            <div className="container m-4">

                                <div className="row">
                                    <div className="col-md-8 p-4">
                                        <h2 className='fw-medium'>Description</h2>
                                        <p>{hackathon?.description}</p>
                                    </div>
                                    <div className="col-md-4 p-4">
                                        <h3 className='fw-medium text-black-50'>Hackathon</h3>
                                        <h2 className='fw-medium'>{title}</h2>
                                        <p>
                                            From
                                            <span>{new Date(hackathon?.start_date)?.toLocaleString()}</span>to
                                            <span>{new Date(hackathon?.end_date)?.toLocaleString()}</span>
                                        </p>


                                    </div>
                                </div>

                            </div>
                            :
                            <div className="container m-4">
                                <h2 className='fw-medium text-center'>User Submissions</h2>
                                <div className="row row-cols-1 row-cols-md-3 g-4 m-2">

                                    {submissions.map(submission => {
                                        return (


                                            <div key={submission.user} className="col">
                                                <div className="card text-bg-light h-100 shadow">
                                                    <div class="card-header">{submission.user}</div>
                                                    <div class="card-body">
                                                        <h5 class="card-title">{submission.name}</h5>
                                                        <p class="card-text">{submission.description}</p>
                                                        <a class="card-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href={submission_url(submission)} target='_blank' rel='noreferrer' >
                                                            Link to Submission
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}



                                </div>

                            </div>
                    }




                </div>

            </div >
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Information</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            This action is irreversible. It can't be undone in future.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={() => {
                                performAction();
                                setAction('');
                            }}>Understood</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
