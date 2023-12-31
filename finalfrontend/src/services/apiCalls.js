import axios from 'axios';

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

  // Edit profile
  export const updateProfile = async (profile, datosRdxUser) => {
    try {
      const tokenHeader = {
        headers: {
          'Authorization': `Bearer ${datosRdxUser.credentials.token}`
        }
      };

      return await axios.put('http://localhost:3000/update', profile, tokenHeader);
    } catch (error) {
      console.log(error);
    }
  };

  // List all users
  export const getAllUsers = async (token) => {
    return await axios.get(`http://localhost:3000/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // Create Achievement
  export const createAchievement = async (body) => {
    return await axios.post('http://localhost:3000/newupgrade/', body);
  }

  // Edit Achievement
export const editAchievement = async (body, token) => {
  return await axios.put('http://localhost:3000/editupgrade/' + body.id, body, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Delete Achievement
export const delAchievement = async (id) => {
  return await axios.delete(`http://localhost:3000/deleteupgrade/${id}`);
};

//Get all upgrades
export const getAllAchievements = async () => {
  return await axios.get('http://localhost:3000/upgrades');
}

// Add upgradesUser
export const addUpgradeUser = async (upgradeId, userId) => {
  try {
    const response = await axios.post('http://localhost:3000/newupgradeuser', {
      upgrade: upgradeId,
      user: userId,
    });

    return response.data;
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    throw error;
  }
};

//Get upgrades by id
export const getUpgradeById = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/myupgrades/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user upgrades:', error);
    throw error; 
  }
};