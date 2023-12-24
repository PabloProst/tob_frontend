import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

export const Home = () => {
  return (
    <div className='home-design'>
      <div className='home-container'>
        <img src='./src/assets/img/logo.png' alt='Logo' className='image-logo'></img>
        <Link to="/rules" className='btn-play'>PLAY</Link>
      </div>
    </div>
  );
}