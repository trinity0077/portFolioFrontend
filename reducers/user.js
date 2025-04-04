import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, userName: null, dateCreation:null,dataChart:[null] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.userName = action.payload.userName;
      state.value.dateCreation = action.payload.dateCreation;
      console.log('login du reducer user')
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userName = null;
      state.value.dateCreation = null;
      console.log('logout du reducer user')
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
