import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// https://ui.dev/react-router-v5-protected-routes-authentication
// need to add the token verification pn backend?

interface IPrivateRouteProps {
  path: string,
  children: React.ReactElement
}

interface RootState {
  auth: {
    user: {};
  };
}

export default function PrivateRoute({ children, ...rest }: IPrivateRouteProps) {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return currentUser ? <Route {...rest} render={() => children}></Route> : <Redirect to="/signin" />
}