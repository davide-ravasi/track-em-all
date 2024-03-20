import React, { useCallback, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { logout, register, login } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../hooks/UseToast";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { notifySuccess } = useToast();

  const [currentUser] = useState();
  const token = localStorage.getItem("tea-token");

  const logoutUser = useCallback(
    (message) => {
      notifySuccess(message, { autoClose: 1000 });
      localStorage.removeItem("tea-token");
      dispatch(logout());
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
    if (token) {
      const decodedToken = jwt.decode(token);
      // @TODO: I need to check why i can't use the expiration date (exp, date not correct)
      const tokenExpirationDate = new Date(decodedToken.iat * 1000);
      tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 1);
      const now = new Date();

      if (now >= tokenExpirationDate) {
        logoutUser("you're connection has expired");
      }
    }
  }, [token, dispatch, logoutUser]);

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
