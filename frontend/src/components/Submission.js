import React, { useState } from 'react'
import Box from './utils/Box'
import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function Submission({ showAlert }) {
    const [submission, setSubmission] = useState({
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
                const resp = await axios.get(`http://127.0.0.1:8000/api/hackathon/submissions/${title}/`, config);

                result = resp.data[0];

            }
            catch {
                result = {};
            }

            setSubmission(result);
        }
        runOnMount();

    }, [title]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'image_submission' || name === 'file_submission') {
            setSubmission({ ...submission, [name]: event.target.files[0] });
        } else {
            setSubmission({ ...submission, [name]: value });
        }
    };



    const createSubmission = () => {
        const formData = new FormData();
        formData.append('name', submission.name);
        formData.append('summary', submission.summary);


        if (submission.hasOwnProperty('file_submission') && !submission.file_submission.startsWith('/media')) {

            formData.append('file_submission', submission.file_submission);
        }

        if (submission.hasOwnProperty('image_submission') && !submission.image_submission.startsWith('/media')) {

            formData.append('image_submission', submission.image_submission);
        }

        if (submission.hasOwnProperty('image_submission')) {

            formData.append('link_submission', submission.link_submission);
        }


        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.put(`http://127.0.0.1:8000/api/hackathon/submit/${title}/`, formData, config).then(resp => {

            showAlert('success', "Success", "Hackathon Submission Editied");
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
                <h3 className='text-center fw-300'>Edit Hackathon Submission - {title} </h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createSubmission();
                }} encType="multipart/form-data" >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Submission Name</label>
                        <input type="text" className="form-control" id="name" onChange={handleChange} name='name' value={submission?.name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="summary" className="form-label">Summary</label>
                        <textarea className="form-control" onChange={handleChange} id="summary" name="summary" rows="3" value={submission?.summary}></textarea>
                    </div>
                    {
                        submission.hasOwnProperty('file_submission') &&
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">File Upload</label>
                            <input className="form-control" onChange={handleChange} name="file_submission" type="file" aria-describedby='file_submission_help' id="formFile" />
                            <div id="file_submission_help" className="form-text"><a href={`http://localhost:8000${submission.file_submission}`} target="_blank" rel='noreferrer' className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{submission.file_submission}</a></div>
                        </div>
                    }
                    {
                        submission.hasOwnProperty('image_submission') &&
                        <div className="mb-3">
                            <label htmlFor="forimg" className="form-label">File Upload</label>
                            <input className="form-control" onChange={handleChange} name="image_submission" type="file" aria-describedby='image_submission_help' id="forimg" accept="image/*" />
                            <div id="image_submission_help" className="form-text"><a href={`http://localhost:8000${submission.image_submission}`} target="_blank" rel='noreferrer' className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{submission.image_submission}</a></div>
                        </div>
                    }
                    {
                        submission.hasOwnProperty('link_submission') &&
                        <div className="mb-3">
                            <label htmlFor="formURL" className="form-label">Project URL</label>
                            <input className="form-control" onChange={handleChange} name="link_submission" type="url" aria-describedby='link_submission_help' id="formURL" />
                            <div id="link_submission_help" className="form-text"><a href={submission.link_submission} target="_blank" rel='noreferrer' className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{submission.link_submission}</a></div>
                        </div>
                    }




                    <button type="submit" className="btn btn-success btn-lg shadow" >Submit</button>
                </form>
            </Box>

        </>


    )
}
