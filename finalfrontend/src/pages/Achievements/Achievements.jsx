import React, { useState, useEffect } from 'react';
import { getAllAchievements } from '../../services/apiCalls';
import './Achievements.css';

export const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const getAchievements = async () => {
      try {
        const response = await getAllAchievements();
        setAchievements(response.data.upgrades);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    getAchievements();
  }, []);

  return (
    <div className='achievements-container'>
      <h2 className='achievements-header'>Achievements</h2>
      <ul className='achievements-list'>
        {achievements.map(achievement => (
          <div key={achievement.id} className='achievement-item'>
            <strong className='achievement-name'>Name:</strong> {achievement.name}<br />
            <strong className='achievement-description'>Description:</strong> {achievement.description}<br />
            <strong className='achievement-cost'>Cost:</strong> {achievement.cost}<br />
          </div>
        ))}
      </ul>
    </div>
  );
};
