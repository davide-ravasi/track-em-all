import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

export default function Header() {

  return (
    <>
      <nav className="navbar">
        <div className="navbar__links">
          <div className="navbar-container--left">
              <Link to="/" className="navbar_menuItem">Tracker</Link>
          </div>
          <div className="navbar-container--right">
            <Link to="/about" className="navbar__menuItem">
              About
            </Link>              
            <Link to="/signin" className="navbar__menuItem">
              SignIn
            </Link>              
            <Link to="/signup" className="navbar__menuItem">
              SignUp
            </Link>          
          </div>
        </div>
      </nav>
    </>
  );
}