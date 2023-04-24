import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { getUser } from "../utils";

import "./css/user-albums.css";

function AlbumList({ userId }) {
  const [albums, setAlbums] = useState([]);
  const params = useParams();
  const loggedInUser = getUser();

  useEffect(() => {
    axios
      .get(`/api/albums?userId=${params.userId}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
  }, [params.userId]);

  return (
    <div className="user-albums">
      <h1>Albums</h1>
      {loggedInUser && loggedInUser.userId === parseInt(params.userId) && <button className='create_album-button' onClick={() => { }}>Create Album</button>}
      <div className="album-grid">
        {albums.map((album) => (
          <Link to={`/u/${params.userId}/albums/${encodeURIComponent(album.albumName)}`} key={album.albumId}>
            <div className="album-item">
              <h2>{album.albumName}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
