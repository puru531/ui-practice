//Redux Toolkit (instead of createStore which is deprecated, we will use configureStore instead)
import { configureStore } from "@reduxjs/toolkit"; //it will consist createStore and configureStore, thunk, deveTools and may more

import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
