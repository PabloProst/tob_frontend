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