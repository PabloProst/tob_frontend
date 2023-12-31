import React, { useState } from 'react';
import { editAchievement } from '../../services/apiCalls';
import './EditAchievement.css';

export const EditAchievement = () => {
  const [achievementId, setAchievementId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleEditAchievement = async () => {
    try {
      const response = await editAchievement({
        id: achievementId, 
        name,
        description,
        cost,
      });

      console.log(response.data);

      setAchievementId('');
      setName('');
      setDescription('');
      setCost('');
    } catch (error) {
      console.error('Error editing achievement:', error);
    }
  };

  return (
    <div className='home-design'>
      <div className='ingame-container-admin'>
        <h2>Edit Achievement</h2>
        <div className='form-group'>
          <label htmlFor='achievementId' className='label-achievement'>Achievement ID:</label>
          <input
            type='text'
            id='achievementId'
            value={achievementId}
            onChange={(e) => setAchievementId(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name' className='label-achievement'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description' className='label-achievement'>Description:</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='cost' className='label-achievement'>Cost:</label>
          <input
            type='text'
            id='cost'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <button onClick={handleEditAchievement}>Edit Achievement</button>
      </div>
    </div>
  );
};
