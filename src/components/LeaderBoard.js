import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import './Leaderboard.css';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);
    
    if (error) console.error('Error fetching leaderboard:', error);
    else setLeaderboard(data);
    setIsLoading(false);
  }

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lb__container">
      <motion.h1 
        className="lb__title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Leaderboard
      </motion.h1>
      
      {isLoading ? (
        <div className="lb__loading">Loading...</div>
      ) : (
        <motion.table 
          className="lb__table"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <AnimatePresence>
            <motion.tbody>
              {leaderboard.map((entry, index) => (
                <motion.tr 
                  key={entry.id} 
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={index === 0 ? 'lb__first-place' : ''}
                >
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </motion.table>
      )}
      
      <motion.button 
        className="lb__back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Main Menu
      </motion.button>
    </div>
  );
};

export default LeaderBoard;