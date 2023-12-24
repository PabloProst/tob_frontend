import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InGame.css';

export const InGame = () => {
    const [score, setScore] = useState(0);
    const [bombIndex, setBombIndex] = useState(Math.floor(Math.random() * 4));
  
    const handleSquareClick = (index) => {
      if (index === bombIndex) {
        alert('GAME OVER. SCORE: ' + score);
        setScore(0);
        setBombIndex(Math.floor(Math.random() * 4));
      } else {
        setScore(score + 1);
        setBombIndex(Math.floor(Math.random() * 4));
      }
    };
  
    return (
      <div className='home-design'>
        <div className='home-container'>
          <div className='score'>Score: {score}</div>
          <div className='squares-container'>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`square ${index === bombIndex ? 'bomb' : ''}`}
                onClick={() => handleSquareClick(index)}
              >
                {index === bombIndex ? '💣' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };