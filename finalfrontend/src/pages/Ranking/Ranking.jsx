import './Ranking.css';
import React, { useEffect, useState } from 'react';
import { getRanking, getUserById } from '../../services/apiCalls';

export const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const getDataRanking = async () => {
      try {
        const rankingData = await getRanking();
        const sortedRanking = rankingData.sort((a, b) => b.score - a.score);

        const top10Ranking = sortedRanking.slice(0, 10);

        setRanking(top10Ranking);

        const names = {};
        for (const entry of top10Ranking) {
          const userData = await getUserById(entry.userId);
          names[entry.userId] = userData.name;
        }
        setUserNames(names);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDataRanking();
  }, []);

  return (
    <div className="centered-container">
      <div className="ranking-container">
        <h1 className="ranking-header">Ranking</h1>
        <div className="ranking-table">
          <div className="column">
            <div className="bold margin-bottom">Rank</div>
            {ranking.map((entry, index) => (
              <div key={index} className="margin-bottom">
                {index + 1}
              </div>
            ))}
          </div>
          <div className="column">
            <div className="bold margin-bottom">User</div>
            {ranking.map((entry, index) => (
              <div key={index} className="margin-bottom">
                {userNames[entry.userId]}
              </div>
            ))}
          </div>
          <div className="column">
            <div className="bold margin-bottom">Score</div>
            {ranking.map((entry, index) => (
              <div key={index} className="margin-bottom">
                {entry.score}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
