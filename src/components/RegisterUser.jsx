import React from 'react'
import { Redirect } from 'react-router'
import { useState } from 'react';
import UserService from '../services/UserService';
import { useHistory } from "react-router-dom";

export default function RegisterUser() {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        let user={phone:phone,business_name:name};

        UserService.createUser(user).then(({ data })=>{
            console.log(data.user_id);
            localStorage.setItem("uid", JSON.stringify(data.user_id));
            history.push("/book");
        }).catch(err=>{
            document.body.classList.remove('loading-indicator');
            setError(err.response.data);
        });

    };
    return (
        <div>
            {localStorage.getItem("uid") && <Redirect to="/book" />}
            <div className="container-fluid col-md-4 col-md-offset-4 position-absolute top-50 start-50 translate-middle">

                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">

                        <label className="form-label">Mobile number</label>

                        <input type="tel" className="form-control" id="phone" placeholder="Enter Mobile"
                            onChange={({ target }) => setPhone(target.value)} pattern="[0-9]{10}" required />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">Business Name</label>

                        <input type="text" className="form-control" id="name" placeholder="Enter Name"
                            onChange={({ target }) => setName(target.value)} required />
                    </div>
                    
                    <div className="row justify-content-between">

                        <div className="col">
                            <button type="submit" className="btn btn-primary">Register on Khatabook</button>
                        </div>
                    </div>

                </form>

                <div>
                    <h1>{error}</h1>
                </div>

            </div>
        </div>
    )
}
