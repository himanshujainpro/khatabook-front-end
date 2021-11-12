import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserService from '../services/UserService';
import { useHistory } from "react-router-dom";

export default function LoginComponent() {
    const [phone, setPhone] = useState("9104425268");
    const [error, setError] = useState("");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        UserService.getUserId(phone).then((response) => {
            localStorage.setItem("uid", JSON.stringify(response.data));
            history.push("/book");
        }).catch(err => {
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
                            value={phone}
                            onChange={({ target }) => setPhone(target.value)} pattern="[0-9]{10}" required />
                    </div>

                    <div className="row justify-content-between">

                        <div className="col">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                        <div className="col">
                            <Link to="/register" className="btn btn-primary align">Register</Link>
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
