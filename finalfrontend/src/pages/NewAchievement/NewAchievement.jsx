import React, { useState } from 'react';
import { createAchievement } from '../../services/apiCalls';
import './NewAchievement.css';

export const NewAchievement = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleCreateAchievement = async () => {
    try {
      const response = await createAchievement({
        name,
        description,
        cost
      });

      console.log(response.data);

      setName('');
      setDescription('');
      setCost('');
    } catch (error) {
      console.error('Error creating achievement:', error);
    }
  };

  return (
    <div className='home-design'>
      <div className='ingame-container-admin'>
        <h2>Create a New Achievement</h2>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='cost'>Cost:</label>
          <input
            type='text'
            id='cost'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <button onClick={handleCreateAchievement}>Create Achievement</button>
      </div>
    </div>
  );
};
