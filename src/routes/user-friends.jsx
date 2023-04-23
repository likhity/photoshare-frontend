import React, { useEffect, useState } from 'react';

import "./css/user-friends.css";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import { getUser } from '../utils';

export default function UserFriends() {

    const params = useParams();
    const [friends, setFriends] = useState([]);
    const [searchedFriends, setSearchedFriends] = useState([]);
    const [suggestedFriends, setSuggestedFriends] = useState([]);

    const loggedInUser = getUser();

    useEffect(() => {
        axios.get(`/api/friends?userId=${params.userId}`)
        .then((response) => {
            setFriends(response.data);
        });
        if (loggedInUser && loggedInUser.userId === parseInt(params.userId)) {
            axios.get('/api/suggested-friends')
            .then((response) => {
                setSuggestedFriends(response.data);
            });
        }
    }, [params.userId]);

    const searchFriendsInputChange = (event) => {
        if (event.target.value === "") {
            setSearchedFriends([]);
        } else {
            axios.get(`/api/users?search=${event.target.value}`).then(response => {
                setSearchedFriends(response.data);
            })
        }
    }

    return (
        <div className="user-friends">
            <div className="my-friends">
                <div className="header">
                    <h3>Friends</h3>
                    <p>Since</p>
                </div>
                <div className="friends-list">
                    {
                        friends.length 
                        ? 
                        <ul>
                            {
                                friends.map((friend, index) => (
                                    <li key={index}>
                                        <Link className='friend' to={`/u/${friend.userId}`}>
                                            {friend.firstName} {friend.lastName}
                                            <span className="user-id">
                                                #{friend.userId}
                                            </span>
                                            <span className="date">
                                                {new Date(friend.since).toLocaleDateString()}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        : <p>{loggedInUser && loggedInUser.userId === parseInt(params.userId) ? "You have": "This user has"} no friends.</p>
                    }
                </div>
            </div>
            {
                loggedInUser && loggedInUser.userId === parseInt(params.userId) &&
                <div className="adding-friends-section">
                    <div className="find-friends">
                        <input 
                            type="text" 
                            placeholder='Find Friends...' 
                            onChange={searchFriendsInputChange}
                        />
                        {
                            searchedFriends &&
                            searchedFriends.map((searchedFriend) => (
                                <div key={searchedFriend.userId} className="searched-friend">
                                    <span>
                                        {searchedFriend.firstName} {searchedFriend.lastName}
                                        <span className="user-id">
                                            #{searchedFriend.userId}
                                        </span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            axios.post(`/api/add-friend?friendId=${searchedFriend.userId}`)
                                            .then((response) => {
                                                axios.get(`/api/friends?userId=${params.userId}`)
                                                .then((response) => {
                                                    setFriends(response.data);
                                                });
                                            })
                                        }}
                                    >Add</button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="suggested-friends">
                        <h3>Suggested</h3>
                        {
                            suggestedFriends.map((suggestedFriend, index) => (
                                <div className='suggested-friend' key={index}>
                                    <span>
                                        {suggestedFriend.firstName} {suggestedFriend.lastName}
                                        <span className="user-id">
                                            #{suggestedFriend.userId}
                                        </span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            axios.post(`/api/add-friend?friendId=${suggestedFriend.userId}`)
                                            .then((response) => {
                                                axios.get(`/api/friends?userId=${params.userId}`)
                                                .then((response) => {
                                                    setFriends(response.data);
                                                    axios.get('/api/suggested-friends')
                                                    .then((response) => {
                                                        setSuggestedFriends(response.data);
                                                    });
                                                });
                                            })
                                        }}
                                    >Add</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
