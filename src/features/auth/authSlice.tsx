import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import axios from "axios";
import authService from "./authService";
import axios from "axios";
import { AuthState, Favorite } from "../../typescript/types";

const actualHost = process.env.REACT_APP_EXPRESS_ENDPOINT;
//const actualHost =
// "https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express";

// https://trackem-all.netlify.app/.netlify/functions/express
// https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express/favorite

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error: any) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message); // we can handle this in the error case
  }
});

export const favoriteAdd = createAsyncThunk(
  "auth/favorites/add",
  async (data: Favorite & { userId: number | undefined }, thunkAPI) => {
    try {
      return await axios.post(actualHost + "/favorite/add", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tea-token") || "",
        },
      });
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

export const favoriteRemove = createAsyncThunk(
  "auth/favorites/remove",
  async (data: { userId: number; showId: string }, thunkAPI) => {
    try {
      return await axios.post(actualHost + "/favorite/remove", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tea-token") || "",
        },
      });
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message); // we can handle this in the error case
    }
  }
);

const initialState: AuthState | null = {
  user: null,
  //token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
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
      state.message = action.payload as string;
    });

    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = {
        id: action.payload?.data.id,
        firstName: action.payload?.data.firstName,
        lastName: action.payload?.data.lastName,
        email: action.payload?.data.email,
        favorites: action.payload?.data.favorites,
      };
      //state.token = action.payload.data.token;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });

    // favorite
    builder.addCase(
      favoriteAdd.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "the favorite has been added";
        state.user = {
          id: action.payload.data.id,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          favorites: action.payload.data.favorites,
        };
        //state.token = action.payload.data.token;
      }
    );

    builder.addCase(favoriteAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(favoriteAdd.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      //state.token = action.payload.data.token;
    });

    builder.addCase(
      favoriteRemove.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "the favorite has been removed from your list";
        state.user = {
          id: action.payload.data.id,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          favorites: action.payload.data.favorites,
        };
        //state.token = action.payload.data.token;
      }
    );

    builder.addCase(favoriteRemove.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(favoriteRemove.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      //state.token = action.payload.data.token;
    });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
