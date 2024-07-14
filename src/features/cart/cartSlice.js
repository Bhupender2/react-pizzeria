import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart:[]
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
}; // deriving the initial state

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload); //pushing the item straight away(newItem===payload)
    }, //these are the five reducers
    deleteItem(state, action) {
      //pizzaId===payload
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload); //filter the item whose id is matched to the payload
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++; // here on the this value has already been updated
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--; // here on the this value has already been updated
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItem,
} = cartSlice.actions; //actions creator are created automatically

export default cartSlice.reducer; // exporting the combine reducer done by createSlice

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);


// if we use a lot of selector function it can be hassle so you can handle that "library named called reselect"