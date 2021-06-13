import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import { useAuth } from "../../contexts/AuthContext";
import trackEmAllLogo from "../../assets/track-em-all.svg";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { currentUser, logout } = useAuth();

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
              Tracker
            </Link>
          </div>
          <div className="navbar-container--right">
            <Link to="/about" className="navbar__menuItem">
              About
            </Link>
            {currentUser ? (
              <React.Fragment>
                <Link to="/" className="navbar__menuItem">
                  Favorites
                </Link>
                <Link onClick={logout} to="#" className="navbar__menuItem">
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
