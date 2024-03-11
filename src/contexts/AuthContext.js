import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser] = useState();
  const token = localStorage.getItem("tea-token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt.decode(token);
      // @TODO: I need to check why i can't use the expiration date (exp, date not correct)
      const tokenExpirationDate = new Date(decodedToken.iat * 1000);
      tokenExpirationDate.setHours(tokenExpirationDate.getHours() + 1);
      const now = new Date();

      if (now >= tokenExpirationDate) {
        localStorage.removeItem("tea-token");
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }

  // function logout() {
  //   return auth.signOut();
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

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
