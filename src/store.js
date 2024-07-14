import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice"

const store = configureStore({
  reducer: {
    user: userReducer, // combine reducer from userSlice
    cart:cartReducer   // combine reducer from cartSlice
  },
});

export default store;
