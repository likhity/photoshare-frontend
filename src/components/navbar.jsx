import React from 'react';
import "./css/navbar.css";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navBar'>
        <span className="logo">
            <Link to={"/"}>PhotoShare</Link>
        </span>
        <div className='nav-links'>
            <Link to={"/popular"}>Popular</Link>
            <Link to={"/login"} className='sign-in'>Sign In</Link>
        </div>
    </nav>
  )
}
