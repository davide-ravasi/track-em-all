import React, { useCallback, useContext, useEffect } from 'react';
import * as jose from 'jose';
import { logout, register } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../hooks/UseToast';
import authService from '../features/auth/authService';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { notifySuccess } = useToast();
  const token = localStorage.getItem('tea-token');

  const logoutUser = useCallback(
    (message) => {
      dispatch(logout());
      notifySuccess(message, { autoClose: 1000 });
      localStorage.removeItem('tea-token');
    },
    [dispatch, notifySuccess]
  );

  const registerUser = ({ firstName, lastName, email, password }) => {
    const registerUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    dispatch(register(registerUser));
  };

  const loginUser = async ({ email, password }) => {
    const loginUser = {
      email: email,
      password: password,
    };

    try {
      return await authService.login(loginUser);
    } catch (error) {
      throw new Error(error?.response?.data ?? error?.message);
    }



    //dispatch(login(loginUser));
  };

  useEffect(() => {
    if(!token) {
      return;
    }

    try {
      const decodedToken = jose.decodeJwt(token);

      if(typeof decodedToken.exp !== "number") {
        logoutUser("an error occurred while checking the token");
        return;
      }

      const tokenExpirationDate = new Date(decodedToken.exp * 1000);
      const now = new Date();

      if (now >= tokenExpirationDate) {
        logoutUser("your connection has expired");
      }

    } catch (error) {
      console.error(error?.message ?? 'Token check failed');
      logoutUser("an error occurred while checking the token");
    }

  }, [token, logoutUser]);

  const value = {
    logoutUser,
    registerUser,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
