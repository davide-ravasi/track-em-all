import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
//import { useAuth } from "../../contexts/AuthContext";
import trackEmAllLogo from "../../assets/track-em-all.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
interface RootState {
  auth: {
    user: {};
  };
}

export default function Header() {
  // const { currentUser, logout } = useAuth();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("You have successfully logout!", { autoClose: 2000 });
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__links">
          <div className="navbar-container--left">
            <Link to="/" className="navbar_menuItem">
              <img
                src={trackEmAllLogo}
                alt="Track'em all logo"
                className="navbar__logo"
              />
            </Link>
          </div>
          <div className="navbar-container--right">
            <Link to="/about" className="navbar__menuItem">
              About
            </Link>
            {currentUser ? (
              <React.Fragment>
                <Link to="/favorites" className="navbar__menuItem">
                  Favorites
                </Link>
                <Link
                  onClick={handleLogout}
                  to="#"
                  className="navbar__menuItem"
                >
                  Logout
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/signin" className="navbar__menuItem">
                  SignIn
                </Link>
                <Link to="/signup" className="navbar__menuItem">
                  SignUp
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
