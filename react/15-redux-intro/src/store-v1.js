// =================== Redux without React =================
import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  //here we pass initial state as default state.
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestedLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "custome/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

// we dont created separate reducers for all the reducer, we can combine them to create on root reducer.
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
// const store = createStore(accountReducer);

// store.dispatch({ type: "account/deposit", payload: 50000 });
// store.dispatch({ type: "account/deposit", payload: 20000 });
// store.dispatch({ type: "account/deposit", payload: 5000 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestedLoan",
//   payload: { amount: 1500000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());

//====================== Working with Action creators :
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestedLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(50000));
console.log(store.getState());

store.dispatch(withdraw(5000));
console.log(store.getState());

store.dispatch(requestLoan(1500000));
console.log(store.getState());

store.dispatch(payLoan(1500000));
console.log(store.getState());

//===================================================================
function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalId: nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Purushottam Kumar", "645114"));
console.log(store.getState());

store.dispatch(deposit(50000));
console.log(store.getState());
