import React, { useState } from 'react';
import axios from 'axios';
import './css/Signup.css'; // Import the Signup.css file

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [homeTown, setHomeTown] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    // need to format with first char being uppercase and rest lower for search user api
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    try {
      const response = await axios.post('/api/register', {
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
        email,
        gender,
        homeTown,
        dateOfBirth,
        password,
      });
      
      console.log(response.data);
      // TODO: handle successful signup
    } catch (error) {
      console.error(error);
      // TODO: handle signup error
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h1 className="signup-title">Sign Up</h1>
      <div className="row">
        <div className="col">
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
        </div>
        <div className="col">
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Gender:
            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('Male')} /> Male
            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('Female')} /> Female
          </label>
        </div>
        <div className="col">
          <label>
            Date of Birth:
            <input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Home Town:
            <input type="text" value={homeTown} onChange={(event) => setHomeTown(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
