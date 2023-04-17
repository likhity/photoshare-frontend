import React, { useEffect, useState } from 'react';
import "./css/front-page.css";
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

import PhotoGrid from '../components/photogrid';
import LoadingPhotoGrid from '../components/fakephotogrid';

export default function FrontPage() {

    const [photos, setPhotos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});

    const tags = searchParams.get('tags');
    const tagsSplit = tags?.split(',');

    useEffect(() => {
        if (tags) {
            axios.get(`/api/photos?tags=${tags}`).then(response => {
                setPhotos(response.data);
            })
        } else {
            axios.get("/api/photos").then((response) => {
                setPhotos(response.data);
            })
        }
    }, [tags]);

    return (
    <div className='front-page'>
        <div className='container'>
            <div className='tags-and-search'>
                <div className="tags">
                    {
                        tags && tagsSplit.map((tag, index) => (
                            tag && <Link 
                                to={`/?tags=${tag}`} 
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
                : <LoadingPhotoGrid />
            }
        </div>
    </div>
    )
}
