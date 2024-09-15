import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = () => {
  return (
    <div className="main-menu">
      <div className="menu-content">
        <img 
          src="/images/big-o-showdown-logo.png" 
          alt="Big O Showdown Logo" 
          className="logo"
        />
        <h1 className="title">Big O Showdown</h1>
        <p className="subtitle">Master the art of algorithmic complexity</p>
        
        <div className="button-container">
          <Link to="/slow-round" className="menu-button primary">
            Start Slow Round
          </Link>
          <button className="menu-button secondary" disabled>
            O(1) Round <span className="coming-soon">Coming Soon</span>
          </button>
          <Link to="/resources" className="menu-button resources">
            Learning Resources
          </Link>
        </div>

        <div className="footer">
          <Link to="/how-to-play" className="footer-link">How to Play</Link>
          <Link to="/leaderboard" className="footer-link">Leaderboard</Link>
          <a href="#" className="footer-link">About</a>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;