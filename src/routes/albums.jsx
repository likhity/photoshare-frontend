import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { getUser } from "../utils";

import "./css/user-albums.css";

function CreateAlbumBox({ onClose, onCreate }) {
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleNewAlbumNameChange = (event) => {
    setNewAlbumName(event.target.value);
  };

  const handleCreateAlbum = () => {
    onCreate(newAlbumName);
    setNewAlbumName('');
  };

  return (
    <div className="create-album-box">
      <div className="create-album-header">
        <h2>New Album</h2>
        <button className="create-album-close" onClick={onClose}>&times;</button>
      </div>
      <div className="create-album-body">
        <label htmlFor="new-album-name">Name:</label>
        <input type="text" id="new-album-name" value={newAlbumName} onChange={handleNewAlbumNameChange} />
      </div>
      <div className="create-album-footer">
        <button className="create-album-create" onClick={handleCreateAlbum}>Create</button>
      </div>
    </div>
  );
}

function AlbumList({ userId }) {
  const [albums, setAlbums] = useState([]);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const params = useParams();
  const loggedInUser = getUser();

  useEffect(() => {
    axios
      .get(`/api/albums?userId=${params.userId}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
  }, [params.userId]);

  const handleCreateAlbumClick = () => {
    setShowCreateAlbum(true);
  };

  const handleCreateAlbum = (albumName) => {
    axios.post(`/api/create-album?name=${albumName}`)
    .then(() => {
      axios.get(`/api/albums?userId=${params.userId}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
      setShowCreateAlbum(false);
    })
    .catch((error) => console.error(error));
  };

  const handleCancelCreateAlbum = () => {
    setShowCreateAlbum(false);
  };

  return (
    <div className="user-albums">
      <h1>Albums</h1>
      {loggedInUser && loggedInUser.userId === parseInt(params.userId) && <button className='create_album-button' onClick={handleCreateAlbumClick}>Create Album</button>}
      {showCreateAlbum && (
        <div className="create-album-overlay">
          <CreateAlbumBox onClose={handleCancelCreateAlbum} onCreate={handleCreateAlbum} />
        </div>
      )}
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
