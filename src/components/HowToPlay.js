import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HowToPlay.css';

const HowToPlay = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Analyze the Code",
      description: "You'll be presented with a code snippet. Take your time to understand its structure and algorithm.",
      icon: "🔍"
    },
    {
      title: "Determine Complexity",
      description: "Analyze the time and space complexity of the given code. Consider best, average, and worst-case scenarios.",
      icon: "⏱️"
    },
    {
      title: "Enter Your Answer",
      description: "Input your answers using Big O notation (e.g., O(n), O(log n), O(n²)). Be precise!",
      icon: "✍️"
    },
    {
      title: "Score Points",
      description: "Submit your answer. Correct answers earn you points and advance you to the next challenge.",
      icon: "🎉"
    },
    {
      title: "Keep Going",
      description: "The game continues until you give an incorrect answer or choose to exit. How far can you go?",
      icon: "🚀"
    }
  ];

  return (
    <div className="how-to-play">
      <h1>How to Play Big O Showdown</h1>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`step ${index === activeStep ? 'active' : ''}`}
            onClick={() => setActiveStep(index)}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button 
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button 
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>

      <div className="tips">
        <h2>Pro Tips</h2>
        <ul>
          <li>Look for nested loops and recursive calls - they often indicate higher complexity.</li>
          <li>Consider the input size and how it affects the number of operations.</li>
          <li>Don't forget about space complexity - think about additional data structures used.</li>
          <li>Practice regularly to improve your analysis skills!</li>
        </ul>
      </div>

      <Link to="/" className="back-button">Back to Main Menu</Link>
    </div>
  );
};

export default HowToPlay;