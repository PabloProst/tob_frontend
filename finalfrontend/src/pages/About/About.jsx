import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export const About = () => {
  return (
    <div className='home-design'>
      <div className='ingame-container'>
        <span>WELCOME TO TRAIL OF BOMBS</span>
        <span>
          You must select the correct square from 4 different options. one of them contains a bomb that will make you lose the game, and the other 3 will allow you to progress in the game and earn points.
        </span>
        <span> The game ends when you touch the bomb. Good luck.</span>

        <Link to="/play" className='btn-play'>GO</Link>
      </div>
    </div>
  );
}