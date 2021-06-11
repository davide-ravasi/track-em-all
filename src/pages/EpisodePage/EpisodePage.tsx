import React from "react";
import { useLocation } from "react-router-dom";
import { getUrlImages } from "../../utils";
import { EpisodeProps } from "../../typescript/types";
import Loader from "../../components/Loader/Loader";
import useApiCall from "../../hooks/UseApiCall";
import "./EpisodePage.scss";

export default function EpisodePage(props: any) {
  const location = useLocation<EpisodeProps>();
  const {
    season_number,
    episode_number,
    overview,
    air_date,
    still_path,
    name,
    showId,
  } = location.state;

  const castUrl = `${process.env.REACT_APP_BASE_TVSHOW_URL}${showId}/season/${season_number}/episode/${episode_number}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const { response, error, loading } = useApiCall(castUrl);

  console.log("CAST: ", response);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {error && <div className="loading-error">{error}</div>}
        {loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
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
