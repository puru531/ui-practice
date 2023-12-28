//redux with new redux toolkit
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // requestLoan(state, action) {
    //   //by default these action creators accept only one argument
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance += action.payload.amount;
    // },

    //for accepting multiple arguments, we need to prepare the data
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan; //this should come first because load become zero right away in next line.
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //Middleware --> Whenever we use Thunk, we return a new function
  return async function (dispatch, state) {
    dispatch({ type: "account/convertingCurrency" });
    //gets access to dispatch and state
    //API call
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await resp.json();
    const converted = data.rates.USD;
    //return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
