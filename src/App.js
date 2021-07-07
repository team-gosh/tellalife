import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoChat from './components/VideoChat'
import Stripe from './components/Stripe'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      < Stripe />
      <VideoChat guestName={'ME'} guestRoom={'heso'} />
    </div>
  );
}

export default App;
