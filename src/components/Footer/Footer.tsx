import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as TmdbLogo } from "../../assets/tmdb-logo.svg";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <NavLink to="/about" exact>
          About us
        </NavLink>
      </div>
      <div className="footer-item">
        <a href="https://github.com/chingu-voyages/v30-bears-team-06">
          Github repository
        </a>{" "}
      </div>
      <div className="footer-item">
        <a href="https://www.themoviedb.org/">
          <TmdbLogo width="30px" />
        </a>
      </div>
    </footer>
  );
}
