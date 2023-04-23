import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from "axios";

function AlbumList({ userId }) {
  const [albums, setAlbums] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/albums?userId=${params.userId}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
  }, [params.userId]);

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.albumId}>
            <h2>{album.albumName}</h2>
            <p>Date of Creation: {album.dateOfCreation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
