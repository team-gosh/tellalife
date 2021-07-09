import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import ReservationManagement from './ReservationManagement';
import Feed from './Feed';


function MainPage(props) {
  const {
    video,
    setVideo,
    // user authentication

  } = props;
  const [display, setDisplay] = useState('feed');
  const [user, setUser] = useState({});

  useEffect(async () => {
    // const userData = (await axios.get(.......)).data
    // setUser(userData)
  })

 
  return (
    <div className='MainPage'>
      <div className='header'>
        <button onClick={() => setDisplay('reservations')}>Reservations</button>
        <button onClick={() => setDisplay('feed')}>Feed</button>
        <button onClick={() => setDisplay('profile')}>Profile</button>
      </div>
      {display === 'reservations'
        ? <ReservationManagement user={user} />
        : display === 'profile'
          ? <Profile user={user} />
          : <Feed user={user} />
      }
    </div>
  );
}

export default MainPage;
