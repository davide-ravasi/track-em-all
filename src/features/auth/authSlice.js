import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// put url in variable
// put proxy in package.json
// put url in .env file
// put url in .env.development file
// put url in .env.production file
// put url in .env.test file
// it exists some kind of env variables for netlify?
// put url in netlify.toml file

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await axios.post(
        "http://localhost:8888/.netlify/functions/express/user/register",
        data,
        {headers: {
          'Content-Type': 'application/json'
        }}
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

// add react toastify for notifications

// create service for http requests like authService.js with localstorage

// add function to check if user exists in local storage
// like this:
// const user = JSON.parse(localStorage.getItem("user"));
// user: user ? user : null,
// if not, retrieve from api endpoint
// like this:



export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.data.id,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        email: action.payload.data.email,
        favorites: action.payload.data.favorites,
      };
      state.token = action.payload.data.token;
    });
    // add rejected case
    // add pending case
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
