import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "./EpisodePage.scss";
import { EpisodeProps } from "../../typescript/types";

export default function EpisodePage() {
  const location = useLocation<EpisodeProps>();
  const {
    season_number,
    episode_number,
    overview,
    air_date,
    still_path,
    name,
  } = location.state;

  console.log("state: ", location.state, overview);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        <h2 className="page__h2">Episode Page</h2>
      </div>
    </div>
  );
}
