import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhotoGrid from "../components/photogrid";
import FakePhotoGrid from "../components/fakephotogrid";
import { getUser } from "../utils";

import "./css/individual-album.css";

function AlbumPhotos() {
  const [photos, setPhotos] = useState([]);

  const params = useParams();

  const loggedInUser = getUser();

  const deleteButtonHandler = () => {
    axios.delete(`/api/album?albumName=${params.albumName}`)
    .then((response) => {
        window.location = `/u/${params.userId}/albums`;
    })
  }

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
        <div className="header">
            <h2>{params.albumName}</h2>
            {
                loggedInUser && loggedInUser.userId === parseInt(params.userId) &&
                <button onClick={deleteButtonHandler} className="delete-album">Delete Album</button>
            }
        </div>
      {
        photos.length 
        ? <PhotoGrid photos={photos} />
        : <FakePhotoGrid />
      }
    </div>
  );
}

export default AlbumPhotos;
