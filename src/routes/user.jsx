import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { getUser } from "../utils";

import "./css/user.css";

export default function User() {
    const params = useParams();

    const [userData, setUserData] = useState();

    const loggedInUser = getUser();

    const location = useLocation();
    const currentPage = location.pathname.split('/')[3];

    useEffect(() => {
        axios.get(`/api/user-info?userId=${params.userId}`)
        .then((response) => {
            const data = response.data;
            setUserData(data);
        })
    }, [params.userId]);

    return (
        <div className='user-page'>
            <div className="container">
                {
                    userData ?
                    <div className="user-info">
                        <h2>
                            <span className='d-block'>{userData.firstName}</span> 
                            {userData.lastName}<span className='user-id'>#{userData.userId}</span>
                        </h2>
                        <div className="user-links">
                            <Link 
                                className={!currentPage ? 'bold' : ''} 
                                to={`/u/${params.userId}`}
                            >
                                Photos
                            </Link>
                            <div className="dot"></div>
                            <Link 
                                className={currentPage === 'albums' ? 'bold' : ''} 
                                to={`/u/${params.userId}/albums`}
                            >
                                Albums
                            </Link>
                            <div className="dot"></div>
                            <Link 
                                className={currentPage === 'friends' ? 'bold' : ''} 
                                to={`/u/${params.userId}/friends`}
                            >
                                Friends
                            </Link>
                        </div>
                        <div className="user-details">
                            <div className="detail">
                                <p className='gray'>Hometown</p>
                                <p>{userData.hometown}</p>
                            </div>
                            <div className="detail">
                                <p className='gray'>Date of Birth</p>
                                <p>{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div className="detail">
                                <p className='gray'>Contribution Score</p>
                                <p>{userData.contribution}</p>
                            </div>
                        </div>
                        {
                            loggedInUser && loggedInUser.userId === parseInt(params.userId) &&
                            <Link className='logout-link' to={'/logout'}>Log Out</Link>
                        }
                    </div> :
                    <div className="user-info">
                        Loading...
                    </div>
                }
                <Outlet />
            </div>
        </div>
    )
}
