import '../App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Button from '@mui/material/Button';
import io from 'socket.io-client';

function Match() {
  useEffect(() => {
    const matchSocket = io('http://localhost:80',  { transports : ['websocket'] });
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const user = JSON.parse(userCookie);
      matchSocket.emit("login", { username: user.username });
    }

    matchSocket.on('matched', (matchedUser) => {
      console.log(`You are matched with ${matchedUser}`);
    });

    // Clean up the socket connection on unmount
    return () => {
      matchSocket.disconnect();
    };
  }, []);

  const handleMatch = () => {
    const loggedInUser = Cookies.get('user');
    const user = JSON.parse(loggedInUser);
    console.log(user);
    const username = user.username;

    axios.post(
      "http://localhost:80/match/sendMatch",
      { username: username, difficulty: "easy" },
      { withCredentials: true, credentials: 'include' }
    )
    .then((response) => console.log(response.status))
    .catch(error => console.error("Error matching", error));
  }

  return (
    <div className="wrapper">
      <Button variant="outlined" onClick={handleMatch}>Match</Button>
    </div>
  );
}

export default Match;