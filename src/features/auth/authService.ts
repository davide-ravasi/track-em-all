import axios from 'axios';
import { RegisterCredentials, LoginCredentials } from './authSlice';

const actualHost = import.meta.env.VITE_EXPRESS_ENDPOINT;

//const actualHost =
//("https://8888-davideravasi-trackemall-mclb840f9og.ws-eu110.gitpod.io/.netlify/functions/express");

const register = async (data: RegisterCredentials) => {
  if (data) {
    const response = await axios.post(actualHost + '/user/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
};

const login = async (data: LoginCredentials) => {
  if (data) {
    const response = await axios.post(actualHost + '/user/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      localStorage.setItem('tea-token', response.data.token);
      return response.data;
    }
  }
};

const authService = {
  register,
  login,
};

export default authService;
