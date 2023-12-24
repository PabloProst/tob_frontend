import axios from 'axios';
import { userData } from '../pages/userSlice';


// Register
export const registerUser = async (body) => {

    return await axios.post('http://localhost:3000/register', body);
};


// Login
export const logUser = async (body) => {

    let user = {
        email: body.email,
        password: body.password
    }

    return await axios.post(`http://localhost:3000/login`, user);
}


// Add score

export const addScore = async (body) => {
    return await axios.post('http://localhost:3000/score', body)
}


// Ranking 
export const getRanking = async () => {
    try {
      const response = await axios.get('http://localhost:3000/allscores');
      return response.data.ranking;
    } catch (error) {
      console.error('Error fetching ranking:', error);
      throw error; 
    }
  };


// Get user by id
export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/user/${userId}`);
      return response.data;  
    } catch (error) {
      throw error;  
    }
  };