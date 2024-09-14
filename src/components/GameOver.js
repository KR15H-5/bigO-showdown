import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './GameOver.css';

const GameOver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboardPosition, setLeaderboardPosition] = useState(null);

  useEffect(() => {
    if (score > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([{ name: playerName, score: score }])
      .select();
    
    if (error) console.error('Error submitting score:', error);
    else {
      console.log('Score submitted successfully');
      setSubmitted(true);
      checkLeaderboardPosition();
    }
  };

  const checkLeaderboardPosition = async () => {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('score')
      .order('score', { ascending: false });

    if (error) console.error('Error fetching leaderboard:', error);
    else {
      const position = data.findIndex((entry) => entry.score <= score) + 1;
      setLeaderboardPosition(position);
    }
  };

  return (
    <motion.div 
      className="game-over"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="game-over__content">
        <motion.h1 
          className="game-over__title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Game Over
        </motion.h1>
        <motion.div 
          className="game-over__score-display"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <span className="game-over__score-label">Your Score</span>
          <span className="game-over__score-value">{score}</span>
        </motion.div>
        <AnimatePresence>
          {!submitted ? (
            <motion.form 
              className="game-over__form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6 }}
            >
              <input
                className="game-over__input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <button className="game-over__submit-btn" type="submit">Submit Score</button>
            </motion.form>
          ) : (
            <motion.div 
              className="game-over__submission-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>Score submitted successfully!</p>
              {leaderboardPosition && (
                <p className="game-over__leaderboard-position">
                  Your position on the leaderboard: <span>{leaderboardPosition}</span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="game-over__button-container">
          <motion.button 
            className="game-over__btn game-over__btn--leaderboard"
            onClick={() => navigate('/leaderboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Leaderboard
          </motion.button>
          <motion.button 
            className="game-over__btn game-over__btn--menu"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Main Menu
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOver;