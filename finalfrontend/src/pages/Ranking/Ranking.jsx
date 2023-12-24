import React, { useEffect, useState } from 'react';
import { getRanking, getUserById } from '../../services/apiCalls';

export const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const getTheRanking = async () => {
      try {
        const rankingData = await getRanking();
        const sortedRanking = rankingData.sort((a, b) => b.score - a.score);
        setRanking(sortedRanking);
      } catch (error) {
        console.error('Error getting ranking:', error);
      }
    };

    getTheRanking();
  }, []);

  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const getUserNames = async () => {
      try {
        const names = {};
        for (const entry of ranking) {
          const userData = await getUserById(entry.userId);
          names[entry.userId] = userData.name;
        }
        setUserNames(names);
      } catch (error) {
        console.error(error);
      }
    };

    getUserNames();
  }, [ranking]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Ranking</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Rank</div>
          {ranking.map((entry, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              {index + 1}
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>User</div>
          {ranking.map((entry, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              {userNames[entry.userId]}
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Score</div>
          {ranking.map((entry, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              {entry.score}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
