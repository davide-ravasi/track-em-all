import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as jose from 'jose';
import { logout, register, login } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../hooks/UseToast';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { notifySuccess } = useToast();

  const [currentUser] = useState();
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

  const loginUser = ({ email, password }) => {
    const loginUser = {
      email: email,
      password: password,
    };

    dispatch(login(loginUser));
  };

  useEffect(() => {
    if(!token) {
      return;
    }

    try {
      const decodedToken = jose.decodeJwt(token);

      if(!decodedToken.exp !== "number") {
        logoutUser("an error occurred while checking the token");
        return;
      }

      const tokenExpirationDate = new Date(decodedToken.exp * 1000);
      const now = new Date();

      if (now >= tokenExpirationDate) {
        logoutUser("your connection has expired");
      }

    } catch (error) {
      console.error(error);
      logoutUser("an error occurred while checking the token");
    }

  }, [token, logoutUser]);

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  const value = {
    currentUser,
    logoutUser,
    registerUser,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
