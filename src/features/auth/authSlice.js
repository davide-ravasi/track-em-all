import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await axios.post(
        "http://localhost:8888/.netlify/functions/express/user/register",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email, 
          password: data.password,
        }
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add react toastify for notifications

// create service for http requests like authService.js with localstorage

// add function to check if user exists in local storage
// if not, retrieve from api endpoint

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
