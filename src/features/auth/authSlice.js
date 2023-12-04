import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const actualHost = process.env.REACT_APP_EXPRESS_ENDPOINT;

// put url in variable
// put proxy in package.json

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await axios.post(actualHost + "/user/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await axios.post(actualHost + "/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message); // we can handle this in the error case
  }
});

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
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
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
      state.token = action.payload.data.token;
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
