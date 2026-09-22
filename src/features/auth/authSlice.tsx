import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import axios from "axios";
import authService from './authService';
import axios from 'axios';
import { AuthState, Favorite } from '../../typescript/types';

type FavoriteListResponse = {
  favorites: Favorite[];
};

export type RegisterResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Favorite[];
  token: string;
};
export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Favorite[];
  token: string;
};

/** Normalizes axios `response.data` (string or JSON body) for toasts / Redux `message`. */
export function formatErrorMessage(data: unknown): string {
  if (typeof data === 'string') {
    return data;
  }
  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof (data as { message: unknown }).message === 'string'
  ) {
    return (data as { message: string }).message;
  }
  return 'An error occurred';
}

export const actualHost = import.meta.env.VITE_EXPRESS_ENDPOINT;
//const actualHost =
// "https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express";

// https://trackem-all.netlify.app/.netlify/functions/express
// https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express/favorite

export function favoriteRequestHeaders(): Record<string, string> {
  const token = localStorage.getItem('tea-token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>('auth/register', async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      formatErrorMessage(error.response?.data ?? error?.message)
    );
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      formatErrorMessage(error.response?.data ?? error?.message)
    );
  }
});

export const favoriteAdd = createAsyncThunk<
  FavoriteListResponse,
  Favorite,
  { rejectValue: string }
>('auth/favorites/add', async (data, thunkAPI) => {
  try {
    const response = await axios.post(actualHost + '/favorite/add', data, {
      headers: favoriteRequestHeaders(),
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      formatErrorMessage(error.response?.data ?? error?.message)
    );
  }
});

export const favoriteRemove = createAsyncThunk<
  FavoriteListResponse,
  { showId: string },
  { rejectValue: string }
>('auth/favorites/remove', async (data, thunkAPI) => {
  try {
    const response = await axios.post(actualHost + '/favorite/remove', data, {
      headers: favoriteRequestHeaders(),
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      formatErrorMessage(error.response?.data ?? error?.message)
    );
  }
});

const initialState: AuthState | null = {
  user: null,
  //token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  favorites: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.favorites = [];
    },
    logout: (state) => {
      state.user = null;
      //state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(register.pending, (state) => {
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
        id: action.payload?.id,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        email: action.payload?.email,
      };
      state.favorites = action.payload?.favorites;
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
      (state, action: PayloadAction<FavoriteListResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'the favorite has been added';
        state.favorites = action.payload.favorites;
        //state.token = action.payload.data.token;
      }
    );

    builder.addCase(favoriteAdd.pending, (state) => {
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
      (state, action: PayloadAction<FavoriteListResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'the favorite has been removed from your list';
        state.favorites = action.payload.favorites;
        //state.token = action.payload.data.token;
      }
    );

    builder.addCase(favoriteRemove.pending, (state) => {
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
