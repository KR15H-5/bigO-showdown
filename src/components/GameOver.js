import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './GameOver.css';

const GameOver = () => {
  const location = useLocation();
  const score = location.state?.score || 0;

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1 className="title">Game Over</h1>
        <div className="score-display">
          <span className="score-label">Your Final Score</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="message">
          {score > 10 ? "Great job! You're mastering Big O!" : "Keep practicing to improve your Big O skills!"}
        </div>
        <div className="button-container">
          <Link to="/" className="menu-button primary">
            Back to Main Menu
          </Link>
          <Link to="/slow-round" className="menu-button secondary">
            Play Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;