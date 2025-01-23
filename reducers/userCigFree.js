import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    userName: null,
    dateCreation: null,
    cigarettePrice: 0.0,
    preferedChoiceCig: false,
    preferedChoiceVap: false,
    chartDataWeek: [null],
    chartDataMonth: [null],
  },
};

export const userSlice = createSlice({
  name: "userCigFree",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.userName = action.payload.userName;
      state.value.cigarettePrice = action.payload.cigarettePrice;
      state.value.dateCreation = action.payload.dateCreation;
      console.log(
        "login du reducer userCigFree userName",
        state.value.userName
      );
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userName = null;
      state.value.dateCreation = null;
      state.value.cigarettePrice = 0;
      state.value.chartDataWeek = [null];
      state.value.chartDataMonth = [null];
    },
    updateCigarettePrice: (state, action) => {
      state.value.cigarettePrice = action.payload;
      console.log(
        "Reducer updatecigarettePrice sur userCigFree",
        state.value.cigarettePrice
      );
    },
    updatePreferedChoiceVap: (state, action) => {
      state.value.preferedChoiceVap = action.payload;
      console.log(
        "Reducer updatepreferedChoiceVap sur userCigFree",
        state.value.preferedChoiceVap
      );
    },
    updateDataChartWeek: (state, action) => {
      state.value.chartDataWeek = action.payload;
      console.log(
        "Reducer updateDataChartWeek sur userCigFree",
        state.value.chartDataWeek
      );
    },
    updateDataChartMonth: (state, action) => {
      // Remplir directement avec les données reçues sans altérer leur format
      state.value.chartDataMonth = action.payload;
      console.log(
        "Reducer updateDataChartMonth sur userCigFree:",
        state.value.chartDataMonth
      );
    },
  },
});

export const {
  login,
  logout,
  updateDataChartWeek,
  updateDataChartMonth,
  updateCigarettePrice,
} = userSlice.actions;
export default userSlice.reducer;
