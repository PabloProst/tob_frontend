import React, { useState } from 'react';
import './InGame.css';
import { addScore } from '../../services/apiCalls';
import { useSelector } from 'react-redux';

export const InGame = () => {
    const [score, setScore] = useState(0);
    const [bombIndex, setBombIndex] = useState(Math.floor(Math.random() * 4));
  
    const userId = useSelector((state) => state.user.credentials.user_id);


    const handleSquareClick = (index) => {
      if (index === bombIndex) {
        handleGameOver();
      } else {
        setScore(score + 1);
        setBombIndex(Math.floor(Math.random() * 4));
      }
    };

    const handleGameOver = async () => {
      alert('GAME OVER. SCORE: ' + score);
      setScore(0);
      setBombIndex(Math.floor(Math.random() * 4));

      console.log("userId:", userId);


      try {
        const response = await addScore({ userId, score });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error adding score:', error);
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
                {index === bombIndex ? '' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };