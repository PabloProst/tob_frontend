import React, { useState } from 'react';
import { delAchievement } from '../../services/apiCalls';
import './DeleteAchievement.css';

export const DeleteAchievement = () => {
  const [id, setId] = useState('');

  const handleDeleteAchievement = async () => {
    try {
      const response = await delAchievement(id);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className='home-design'>
      <div className='ingame-container-admin'>
        <h2>Delete an Achievement</h2>
        <div className='form-group'>
          <label htmlFor='id' className='label-achievement'>Achievement ID:</label>
          <input
            type='text'
            id='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button onClick={handleDeleteAchievement}>Delete Achievement</button>
      </div>
    </div>
  );
};
