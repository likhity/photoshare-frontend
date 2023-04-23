import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import PhotoGrid from '../components/photogrid';
import FakePhotoGrid from '../components/fakephotogrid';

import "./css/user-photos.css";

export default function UserPhotos() {

    const [photos, setPhotos] = useState([]);
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams({});

    const tags = searchParams.get('tags');
    const tagsSplit = tags?.split(',');
    
    useEffect(() => {
        if (tags) {
            axios.get(`/api/photos?userId=${params.userId}&tags=${tags}`)
            .then((response) => {
                setPhotos(response.data);
            });
        } else {
            axios.get(`/api/photos?userId=${params.userId}`)
            .then((response) => {
                setPhotos(response.data);
            });
        }
    }, [tags]);

    return (
    <div className='user-photos'>
        <div className="tags-and-search">
            <div className="tags">
                {
                    tags && tagsSplit.map((tag, index) => (
                        tag && <Link 
                            to={`?tags=${tag}`} 
                            className="tag"
                            key={index}
                        >
                            {tag}
                        </Link>
                    ))
                }
            </div>
            <input 
                className="search-bar" 
                placeholder="Search by tag..." 
                type="search"
                onChange={(event) => {
                    const tags = event.target.value.split(' ').join(',');
                    setSearchParams({ tags: tags });
                }}
                value={tags ? tagsSplit.join(' ') : ""}
            />
        </div>
        {
            photos.length 
            ? <PhotoGrid photos={photos} /> 
            : <FakePhotoGrid />
        }
    </div>
  )
}
