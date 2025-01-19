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
      console.log('login du reducer userCigFree userName', state.value.userName)
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userName = null;
      state.value.dateCreation = null;
      state.value.chartDataWeek = [null];
      state.value.chartDataMonth = [null];
    },
    updateDataChartWeek: (state, action) => {    
      state.value.chartDataWeek = action.payload;
      console.log('Reducer updateDataChartWeek sur userCigFree',state.value.chartDataWeek )
    },
    updateDataChartMonth: (state, action) => {
      // Remplir directement avec les données reçues sans altérer leur format
      state.value.chartDataMonth = action.payload;
      console.log('Reducer updateDataChartMonth sur userCigFree:', state.value.chartDataMonth);
    },
  },
});

export const { login, logout, updateDataChartWeek, updateDataChartMonth } = userSlice.actions;
export default userSlice.reducer;
