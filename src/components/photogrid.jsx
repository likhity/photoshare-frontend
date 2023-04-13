import React from 'react'
import Photo from './photo'
import "./css/photogrid.css"

export default function PhotoGrid({ photos }) {
  return (
    <div className='photo-grid'>
        {
            photos.map(photo => (
                <Photo 
                    photoId={photo.photoId | photo.photoid} 
                    filepath={photo.filepath} 
                    caption={photo.caption}
                    key={photo.photoId | photo.photoid}
                />
            ))
        }
    </div>
  )
}
