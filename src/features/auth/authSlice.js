import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import axios from "axios";
import authService from "./authService";

//const actualHost = process.env.REACT_APP_EXPRESS_ENDPOINT;

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message); // we can handle this in the error case
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    //token: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = {
        id: action.payload.data.id,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        email: action.payload.data.email,
        favorites: action.payload.data.favorites,
      };
      //state.token = action.payload.data.token;
    });

    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
