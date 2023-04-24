import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhotoGrid from "../components/photogrid";
import FakePhotoGrid from "../components/fakephotogrid";

import "./css/individual-album.css";

function AlbumPhotos() {
  const [photos, setPhotos] = useState([]);

  const params = useParams();

  useEffect(() => {
    axios.get("/api/photos", {
        params: {
          userId: params.userId,
          albumName: params.albumName
        },
      })
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.userId, params.albumName]);

  return (
    <div className='individual-album'>
      <h2>{params.albumName}</h2>
      {
        photos.length 
        ? <PhotoGrid photos={photos} />
        : <FakePhotoGrid />
      }
    </div>
  );
}

export default AlbumPhotos;
