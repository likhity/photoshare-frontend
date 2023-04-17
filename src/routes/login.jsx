import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./css/login.css";

export default function LoginPage() {

    const [error, setError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setError(false);
        const email = e.target.email.value;
        const password = e.target.password.value;
        axios.post("/api/login", { email, password })
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("PHOTOSHARE_USER", JSON.stringify({
                    "userId": response.data.id,
                    "expiration": Date.now() + (8 * 60 * 60 * 1000)
                }));
                window.location = "/";
            }
        })
        .catch((response) => {
            setError(true);
            console.log(response);
        })
    }

    return (
        <div className='login-page'>
            <div className="container">
                <h1>Log In</h1>
                <form className='login-form' onSubmit={submitHandler}>
                    {
                        error
                        ? <p className="error">Either your email or password is incorrect.</p>
                        : <></>
                    }
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                    <label className='password' htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <button type="submit">Login</button>
                </form>
                <p className='new-here'>New here? <Link className='sign-up-link' to="/signup">Sign up</Link>.</p>
            </div>
        </div>
    )
}
