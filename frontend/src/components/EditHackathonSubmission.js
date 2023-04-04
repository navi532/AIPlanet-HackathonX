import React, { useState, useEffect } from 'react'
import Box from './utils/Box'
import axios from 'axios'
import { useParams } from 'react-router';

export default function EditHackathonSubmission({ showAlert }) {
    const [hackathon, setHackathon] = useState({
    });


    const { title } = useParams();





    useEffect(() => {
        async function runOnMount() {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`

                }
            };
            let result = {};
            try {
                const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/view?title=${title}`, config);


                result = resp.data[0];

            }
            catch {
                result = {};
            }

            setHackathon(result);
        }
        runOnMount();

    }, [title]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'background_image' || name === 'hackathon_image') {
            setHackathon({ ...hackathon, [name]: event.target.files[0] });
        } else {
            setHackathon({ ...hackathon, [name]: value });
        }
    };



    const createHackathon = () => {
        const formData = new FormData();
        formData.append('title', hackathon.title);
        formData.append('description', hackathon.description);
        formData.append('start_date', hackathon.start_date);
        formData.append('end_date', hackathon.end_date);
        formData.append('reward_prize', hackathon.reward_prize);
        formData.append('submission_type', hackathon.submission_type);

        if (hackathon.background_image && !hackathon.background_image?.startsWith('/media')) {

            formData.append('background_image', hackathon.background_image);
        }

        if (hackathon.hackathon_image && !hackathon.hackathon_image?.startsWith('/media')) {
            formData.append('hackathon_image', hackathon.hackathon_image);
        }


        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.patch(`http://127.0.0.1:8000/api/hackathon/edit/${title}/`, formData, config).then(resp => {

            showAlert('success', "Success", "Hackathon Editied");
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
                <h3 className='text-center fw-300'>Edit a Hackathon </h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createHackathon();
                }} encType="multipart/form-data" >
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={handleChange} name='title' value={hackathon.title} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" onChange={handleChange} id="description" name="description" rows="3" value={hackathon.description}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Background Image</label>
                        <input className="form-control" onChange={handleChange} name="background_image" type="file" aria-describedby='backgroundimgHelp' accept="image/*" id="formFile" />
                        <div id="backgroundimgHelp" className="form-text"><a href={`http://localhost:8000${hackathon.background_image}`} target="_blank" rel='noreferrer' className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{hackathon.background_image}</a></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Hackathon Image</label>
                        <input className="form-control" onChange={handleChange} name="hackathon_image" type="file" accept="image/*" aria-describedby='hackathonimgHelp' id="formFile" />
                        <div id="hackathonimgHelp" className="form-text"><a href={`http://localhost:8000${hackathon.hackathon_image}`} target="_blank" rel='noreferrer' className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{hackathon.hackathon_image}</a></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="start_date" className="form-label">Start Time</label>
                        <input type="datetime-local" className="form-control" id="start_date" onChange={handleChange} name='start_date' value={hackathon.start_date ? new Date(hackathon.start_date)?.toISOString()?.replace('Z', '') : ''} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="end_date" className="form-label">End Time</label>
                        <input type="datetime-local" className="form-control" id="end_date" onChange={handleChange} name='end_date' value={hackathon.end_date ? new Date(hackathon.end_date)?.toISOString()?.replace('Z', '') : ''} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reward" className="form-label">Reward Prize</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">&#8360;</span>
                            <input type="number" name="reward_prize" id="reward" onChange={handleChange} value={hackathon.reward_prize} className="form-control" aria-label="Amount (to the nearest ruppess)" />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>


                    <div className="mb-3">
                        <select className="form-select" name="submission_type" value={hackathon.submission_type} onChange={handleChange} aria-label="Select Submission Type ">
                            <option value="FILE" >File</option>
                            <option value="IMAGE" >Image</option>
                            <option value="LINK" >Link</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg shadow" >Submit</button>
                </form>
            </Box>

        </>


    )
}
