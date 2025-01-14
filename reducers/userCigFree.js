import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, userName: null, dateCreation:null, chartDataWeek:[null], chartDataMonth:[null]},
};

export const userSlice = createSlice({
  name: 'userCigFree',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.userName = action.payload.userName;
      state.value.dateCreation = action.payload.dateCreation;
      state.value.dataChartWeek = action.payload.dataChartWeek;
      state.value.dataChartMonth = action.payload.dataChartMonth;
      console.log('login du reducer userCigFree')
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userName = null;
      state.value.dateCreation = null;
      state.value.chartDataWeek = [null];
      state.value.chartDataMonth = [null];
    },
    updateDataChartWeek: (state, action) => {    
      state.value.chartDataWeek = action.payload.chartDataWeek;
    },
    updateDataChartMonth: (state, action) => {    
      state.value.chartDataMonth = action.payload.chartDataMonth;
    },
  },
});

export const { login, logout, updateDataChartWeek, updateDataChartMonth } = userSlice.actions;
export default userSlice.reducer;
