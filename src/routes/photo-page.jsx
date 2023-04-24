import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PhotoPage() {

    const params = useParams();
    const [photoData, setPhotoData] = useState();

    useEffect(() => {
        axios.get(`/api/photo?photoId=${params.photoId}`)
        .then(response => {
            console.log(response.data);
            setPhotoData(response.data);
        })
    }, [])

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
                    </div>
                    <div className="right-side"></div>
                </div>
                : <div className="loading">
                    Loading...
                </div>
            }
        </>
    )
}
