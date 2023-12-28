import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {
        user_id: "",
        name: "",
        email: "",
        password: "",
        TOKEN: "",
        role: "",
      }
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          credentials: {
            ...state.credentials,
            ...action.payload
          }
        };
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
  });

export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;