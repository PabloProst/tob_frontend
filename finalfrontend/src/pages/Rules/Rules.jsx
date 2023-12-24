import React from 'react';
import { Link } from 'react-router-dom';
import './Rules.css';

export const Rules = () => {
  return (
    <div className='home-design'>
      <div className='ingame-container'>
        <span>HOW TO PLAY</span>
        <span>
          You must select the correct square from 4 different options. 2 of them contain bombs that will make you lose the game, and the other 2 will allow you to progress in the game and earn points.
        </span>
        <span> The game ends when you touch a bomb. Good luck.</span>

        <Link to="/play" className='btn-go'>GO</Link>
      </div>
    </div>
  );
}