import React from "react";
import "./Loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__text">Loading...</div>
      <div className="loader__spinner" />
    </div>
  );
}
