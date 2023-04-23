import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./css/popular.css";

function PopularTags() {
  const [popularTags, setPopularTags] = useState([]);

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        const response = await axios.get('/api/popular-tags');
        setPopularTags(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPopularTags();
  }, []);

  return (
    <div>
      <h2>Popular Tags</h2>
      <ul>
        {popularTags.map((tag) => (
          <li key={tag.tag}>
            <Link to={{ pathname: '/', search: `?tags=${tag.tag}` }}>
              {tag.tag} ({tag.numPosts})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get("/api/top-10-users").then((response) => {
        setUsers(response.data);
      });
    }, []);
    
  return (
    <div>
      <h2>Top Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhotoRecommendations() {
  const [photoRecommendations, setPhotoRecommendations] = useState([]);

  useEffect(() => {
    async function fetchPhotoRecommendations() {
      try {
        const response = await axios.get('/api/photo-recommendations');
        setPhotoRecommendations(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPhotoRecommendations();
  }, []);

  return (
    <div>
      <h2>Photo Recommendations</h2>
      <ul>
        {photoRecommendations.map((photo) => (
          <li key={photo.photoId}>
            <img src={photo.filepath} alt={photo.caption} width="200" height="200" />
            <p>{photo.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function popular() {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get('tag');

  return (
    <div>
      {tag ? (
        <h1>Showing photos tagged with "{tag}"</h1>
      ) : (
        <h1>Welcome to our photo sharing app!</h1>
      )}
      <PopularTags />
      <TopUsers />
      <PhotoRecommendations />
    </div>
  );
}

export default popular;
