import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import "./css/photo-page.css";

import { BsHandThumbsUpFill } from "react-icons/bs";
import { getUser } from '../utils';

export default function PhotoPage() {

    const params = useParams();
    const [photoData, setPhotoData] = useState();
    const [comments, setComments] = useState([]);

    const loggedInUser = getUser();

    useEffect(() => {
        axios.get(`/api/photo?photoId=${params.photoId}`)
        .then(response => {
            console.log(response.data);
            setPhotoData(response.data);
        });
        axios.get(`/api/comments?photoId=${params.photoId}`)
        .then((response) => {
            console.log(response.data);
            setComments(response.data);
        })
    }, []);

    const searchCommentsHandler = (e) => {
        if (!e.target.value) {
            axios.get(`/api/comments?photoId=${params.photoId}`)
            .then((response) => {
                console.log(response.data);
                setComments(response.data);
            });
        } else {
            axios.get(`/api/comments?photoId=${params.photoId}&search=${e.target.value}`)
            .then((response) => {
                setComments(response.data);
            });
        }
    }

    const commentSubmitHandler = (e) => {
        if (e.key === "Enter" && e.target.value) {
            axios.post(`/api/add-comment`, 
                { 
                    photoId: params.photoId, 
                    comment: e.target.value 
                }
            )
            .then(response => {
                axios.get(`/api/comments?photoId=${params.photoId}`)
                .then((response) => {
                    setComments(response.data);
                    e.target.value = "";
                });
            })
        }
    }

    return (
        <>
            {
                photoData ?
                <div className='photo-page'>
                    <div className="photo-view">
                            <img 
                                src={photoData.url} 
                                alt={photoData.caption} 
                                className="photo" 
                            />
                            <div className="caption">{photoData.caption}</div>
                            <div className="tags">
                                {
                                    photoData.tags.map((tag, index) => (
                                        tag && <Link to={`/?tags=${tag}`} key={index} className="tag">
                                            {tag}
                                        </Link>
                                    ))
                                }
                            </div>
                    </div>
                    <div className="right-side">
                        <h3><Link to={`/u/${photoData.ownerId}`}>{photoData.firstName} {photoData.lastName}<span className="user-id">#{photoData.ownerId}</span></Link></h3>
                        <p className='upload-date'>Uploaded {new Date(photoData.dateOfCreation).toLocaleDateString()}</p>
                        <div className='wrapper'>
                            <div className='comments-section'>
                                <input 
                                    className='search-comments'
                                    placeholder="Search comments..." 
                                    type="search" 
                                    onChange={searchCommentsHandler}
                                />
                                <div className="comments">
                                    {
                                        comments.map((comment) => (
                                            <div key={comment.commentId} className="comment">
                                                <div className="user-and-date">
                                                    <Link to={`/u/${comment.commenterId}`} className="user">{comment.commenterName}<span className="user-id">#{comment.commenterId}</span></Link>
                                                    <div className="date">{new Date(comment.dateOfCreation).toLocaleDateString()}</div>
                                                </div>
                                                <p className="comment-text">
                                                    {comment.commentText}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                loggedInUser &&
                                <div className="like-and-comment">
                                    <div className="like">
                                        <span className="num-likes">
                                            {photoData.numLikes}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                if (!photoData.liked) {
                                                    axios.post(`/api/like-photo?photoId=${photoData.photoId}`)
                                                    .then((response) => {
                                                        axios.get(`/api/photo?photoId=${params.photoId}`)
                                                        .then(response => {
                                                            setPhotoData(response.data);
                                                        });
                                                    })
                                                } else {
                                                    axios.delete(`/api/like-photo?photoId=${photoData.photoId}`)
                                                    .then((response) => {
                                                        axios.get(`/api/photo?photoId=${params.photoId}`)
                                                        .then(response => {
                                                            setPhotoData(response.data);
                                                        });
                                                    });
                                                }
                                            }}
                                            className={`like-button ${photoData.liked ? 'liked': ''}`}
                                        >
                                            <BsHandThumbsUpFill />
                                        </button>
                                    </div>
                                    <input 
                                        className='comment-input'
                                        placeholder="Leave a comment..."
                                        onKeyDown={commentSubmitHandler}
                                        type="text" 
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : <div className="loading">
                    Loading...
                </div>
            }
        </>
    )
}
