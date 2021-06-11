import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUrlImages } from "../../utils";
import { EpisodeProps, CastData, ImagesData } from "../../typescript/types";
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
  const imagesUrl = `${process.env.REACT_APP_BASE_TVSHOW_URL}${showId}/season/${season_number}/episode/${episode_number}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const {
    response: castResponse,
    error: castError,
    loading: loadingCast,
  } = useApiCall(castUrl);
  const {
    response: imagesResponse,
    error: imagesError,
    loading: loadingImages,
  } = useApiCall(imagesUrl);
  const [actorData, setActorData] = useState<CastData | null>();
  const [imagesData, setImagesData] = useState<ImagesData | null>();

  console.log("IMAGES: ", imagesData);

  useEffect(() => {
    setActorData(castResponse);
    setImagesData(imagesResponse);
  }, [
    castResponse,
    castError,
    loadingCast,
    imagesResponse,
    imagesError,
    loadingImages,
  ]);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {castError && <div className="loading-error">{castError}</div>}
        {(loadingCast || loadingImages) && (
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
        <div className="cast_container">
          {actorData &&
            actorData.cast &&
            actorData.cast.map((actor) => (
              <div key={actor.name}>
                <img
                  alt={actor.character}
                  src={getUrlImages("thumb", actor.profile_path)}
                />
                {actor.name} {actor.character}
                <br />
              </div>
            ))}
        </div>

        <h3>PHOTOS</h3>
        <div className="photos_container">
          {imagesData &&
            imagesData.stills &&
            imagesData.stills.map((photo) => (
              <img
                key={photo.file_path}
                alt={photo.file_path}
                src={getUrlImages("thumb", photo.file_path)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
