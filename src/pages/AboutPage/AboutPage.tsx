import React from "react";
import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <div className="page">
      <div className="page__content-wrapper">
        <h2 className="page__h2">About Show Tracker</h2>
        <p>
          Show Tracker allows you to find and track TV shows so you don't miss a
          single episode. This app was developed by{" "}
          <a href="https://github.com/DanielLopezCS">@DanielLopezCS</a>,{" "}
          <a href="https://github.com/davide-ravasi">@davide-ravasi</a>,{" "}
          <a href="https://github.com/ljgpok">@ljgpok</a> and{" "}
          <a href="https://github.com/theborgh">@theborgh</a> using the{" "}
          <a href="https://www.themoviedb.org/">TMDB</a> api.
        </p>
      </div>
    </div>
  );
}
