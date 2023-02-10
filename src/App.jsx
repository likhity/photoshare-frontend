import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [currentTime, setTime] = useState(0);

  useEffect(() => {
    // make a request to our backend flask server
    axios.get("/api/time").then((response) => {
      /**
       * We expect the server to send us the data in this format:
       *  {
       *    "time": 1232131.12321
       *  }
       * It's in the response.data object
       */
      const time = response.data.time;
      if (!time) return;
      // it will be in unix time format. we need to convert it to a human readable format.
      let unixTimestamp = parseFloat(time);
      const converted = new Date(unixTimestamp * 1000);
      setTime(converted.toLocaleTimeString());
    })
  }, []);

  return (
    <div className="App">
      <h1>PhotoShare App Front-End</h1>
      <div className="card">
        Click the button: 
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {
        currentTime ? 
        <div className='time'>
          <h2>Current Time: {currentTime}</h2>
          <p>^ This time information was received from the backend by making a request to <b>/api/time</b>.</p>
        </div> : 
        <p>Loading current time...</p>
      }
    </div>
  );
}

export default App;
