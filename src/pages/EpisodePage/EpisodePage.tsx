import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { getUrlImages } from "../../utils";
import { EpisodeProps } from "../../typescript/types";
import "./EpisodePage.scss";

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

  return (
    <div className="page">
      <div className="page__content-wrapper">
        <h2 className="page__h2">{name}</h2>
        <img alt={name} src={getUrlImages("big", still_path)} />
        <h3 className="episode_number">
          S{season_number}E{episode_number}
        </h3>
        <h4 className="episode_airdate">{air_date}</h4>
        <p className="episode_overview">{overview}</p>
        <h3>CAST</h3>
        <h3>PHOTOS</h3>
      </div>
    </div>
  );
}
