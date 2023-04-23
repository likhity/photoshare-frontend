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
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    setError(false);
    setEmailError(false);
    // need to format with first char being uppercase and rest lower for search user api
    if (!event.target.firstName.value ||
        !event.target.lastName.value ||
        !event.target.gender.value ||
        !event.target.dob.value ||
        !event.target.hometown.value ||
        !event.target.email.value ||
        !event.target.password.value
      ) {
      setError(true)
      return
    }


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
      
      if (response.status === 201) {
        //if we created user we log user in by setting user token (and set to home)
        localStorage.setItem("PHOTOSHARE_USER", JSON.stringify({
            "userId": response.data.id,
            "expiration": Date.now() + (8 * 60 * 60 * 1000)
        }));
        window.location = "/";
      }
      
    } catch (error) {
      console.error(error);
      if (error.response.status === 409) {
        setEmailError(true);
      }
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h1 className="signup-title">Sign Up</h1>
      {emailError ? <p className="signup-error">Email already in use</p>: <></>}
      {error ? <p className="signup-error">Please fill in all fields</p>: <></>}
       <div className="row">
        <div className="col">
          <label>
            First Name:
            <input type="text" name ='firstName' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
        </div>
        <div className="col">
          <label>
            Last Name:
            <input type="text" name ='lastName' value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Gender:
            <input type="radio" name="gender" value="male" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male
            <input type="radio" name="gender" value="female" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female
          </label>
        </div>
        <div className="col">
          <label>
            Date of Birth:
            <input type="date" name='dob' value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Home Town:
            <input type="text" name='hometown' value={homeTown} onChange={(event) => setHomeTown(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Email:
            <input type="email" name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Password:
            <input type="password" name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
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
