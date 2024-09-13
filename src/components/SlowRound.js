import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeSnippet from './CodeSnippet';
import { loadSnippets, getRandomSnippet, checkAnswer, resetUsedSnippets } from '../utils/gameLogic';
import './SlowRound.css'; // We'll create this CSS file for custom styles

const SlowRound = () => {
  const [snippet, setSnippet] = useState(null);
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timed out')), 10000)
      );
      
      await Promise.race([loadSnippets(), timeoutPromise]);
      
      resetUsedSnippets();
      loadNewSnippet();
    } catch (err) {
      console.error('Error initializing game:', err);
      setError('Oops! There was an error loading the game. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadNewSnippet = () => {
    try {
      const newSnippet = getRandomSnippet();
      if (newSnippet) {
        setSnippet(newSnippet);
        setTimeComplexity('');
        setSpaceComplexity('');
      } else {
        setError('No more snippets available. Youve mastered them all!');
      }
    } catch (err) {
      console.error('Error loading new snippet:', err);
      setError('Oops! There was an error loading a new snippet. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (checkAnswer(snippet, timeComplexity, spaceComplexity)) {
      setScore(score + 1);
      loadNewSnippet();
    } else {
      navigate('/game-over', { state: { score } });
    }
  };

  const handleExitGame = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the game? Your progress will be lost."
    );
    if (confirmExit) {
      navigate('/');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={initializeGame} className="retry-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="slow-round">
      {/* Left panel: Code snippet */}
      <div className="code-panel">
        <h2>Code Snippet</h2>
        <CodeSnippet code={snippet?.code} />
      </div>

      {/* Right panel: Complexity inputs and controls */}
      <div className="input-panel">
        <h2>Complexity Analysis</h2>
        
        <div className="input-group">
          <label htmlFor="timeComplexity">Time Complexity</label>
          <input
            id="timeComplexity"
            type="text"
            placeholder="e.g., O(n), O(n log n)"
            value={timeComplexity}
            onChange={(e) => setTimeComplexity(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="spaceComplexity">Space Complexity</label>
          <input
            id="spaceComplexity"
            type="text"
            placeholder="e.g., O(1), O(n)"
            value={spaceComplexity}
            onChange={(e) => setSpaceComplexity(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>

        <div className="footer">
          <div className="score">Score: {score}</div>
          <button onClick={handleExitGame} className="exit-button">
            Exit Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlowRound;