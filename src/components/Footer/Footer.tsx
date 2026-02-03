import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer-item">
        <NavLink to="/about" exact>
          About us
        </NavLink>
      </section>
      <section className="footer-item">
        <a 
          href="https://github.com/chingu-voyages/v30-bears-team-06" 
          title="Visit our Github repository" 
          target="_blank" 
          rel="noopener noreferrer">
          Github repository
        </a>{" "}
      </section>
      <section className="footer-item">
        <a 
          href="https://www.themoviedb.org/" 
          title="Visit TMDB website" 
          target="_blank" 
          rel="noopener noreferrer">
           <img src="/tmdb-logo.svg" alt="TMDB logo" width="30px" aria-hidden="true" />
           <span className="sr-only">TMDB website</span>
        </a>
      </section>
    </footer>
  );
}
