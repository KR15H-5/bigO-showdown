import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import SlowRound from './components/SlowRound';
import HowToPlay from './components/HowToPlay';
import GameOver from './components/GameOver';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/slow-round" element={<SlowRound />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/game-over" element={<GameOver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;