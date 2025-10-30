import React from "react";
import { NavLink } from "react-router-dom";
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
          <img src="/tmdb-logo.svg" alt="TMDB logo" width="30px" />
        </a>
      </div>
    </footer>
  );
}
