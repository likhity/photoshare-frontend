import React from 'react';
import "./css/navbar.css";
import { Link } from 'react-router-dom';
import { getUser } from '../utils';
import { FiUpload } from "react-icons/fi";

export default function NavBar() {

    const user = getUser();
    
    return (
    <nav className='navBar'>
        <span className="logo">
            <Link to={"/"}>PhotoShare</Link>
        </span>
        {
            user ?
            <div className='nav-links'>
                <Link to={"/popular"}>Popular</Link>
                <Link to={`/u/${user.userId}`}>My Profile</Link>
                <Link to={"/upload"} className='upload'><FiUpload /> Upload</Link>
            </div> :
            <div className='nav-links'>
                <Link to={"/popular"}>Popular</Link>
                <Link to={"/login"} className='sign-in'>Sign In</Link>
            </div>
        }
    </nav>
    )
}
