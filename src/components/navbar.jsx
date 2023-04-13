import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navBar'>
        <h1 className="logo">
            <Link to={"/"}>PhotoShare</Link>
        </h1>
        <div className='nav-links'>
            <Link to={"/popular"}>Popular</Link>
            <Link to={"/login"} className='sign-in'>Sign In</Link>
        </div>
    </nav>
  )
}
