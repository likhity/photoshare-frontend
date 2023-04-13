import React from 'react'
import { Link } from 'react-router-dom'
import "./css/photo.css"

export default function Photo({ photoId, filepath, caption }) {
  return (
    <Link className='photo-link' to={`/p/${photoId}`}>
        <img 
            src={filepath}  
            alt={caption}
            className='photo'
        />
        <p className='caption'>{caption}</p>
    </Link>
  )
}
