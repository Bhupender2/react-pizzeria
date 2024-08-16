import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload; // we can directly mutate the state in redux toolkit.
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

function getPosition() {
  // wrapping a promise in a function so that we can use async await coz it returns a promise when we use async await
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
} // here we get the information of the current position and then based on the current position we find the address and everything

//fetchAddress has become the action creator function which we later call on

export const fetchAddress = createAsyncThunk("user/fetchAddress", async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}); // passing an async function which will return the payload for the reducer later  ( this function will return a promise so an async function is perfect here)

// MIDDLEWARE
// it sits between dispatching and reducer itself it will do something to the dispactched action before actually updating the store

// there are two ways of
//1. manually creating our own action creator and placed the thunk in there

// 2 .now in order to create a thunk we will use createAsyncThunk
