import React from "react";
import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <main className="page">
      <div className="page__content-wrapper">
        <h1 className="page__title">About Show Tracker</h1>
        <p>
          Show Tracker allows you to find and track TV shows so you don't miss a
          single episode. This app was developed by{" "}
          <a
            href="https://github.com/DanielLopezCS"
            target="_blank"
            rel="noopener noreferrer"
          >
            @DanielLopezCS
          </a>
          ,{" "}
          <a
            href="https://github.com/davide-ravasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            @davide-ravasi
          </a>
          ,{" "}
          <a
            href="https://github.com/ljgpok"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ljgpok
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/theborgh"
            target="_blank"
            rel="noopener noreferrer"
          >
            @theborgh
          </a>{" "}
          using the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Movie Database
          </a>{" "}
          api.
        </p>
      </div>
    </main>
  );
}
