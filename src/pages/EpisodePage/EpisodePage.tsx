import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUrlImages, padNumber } from "../../utils";
import { EpisodeProps, CastData, ImagesData } from "../../typescript/types";
import Loader from "../../components/Loader/Loader";
import useApiCall from "../../hooks/UseApiCall";
import "./EpisodePage.scss";
import PersonCard from "../../components/PersonCard/PersonCard";
import PhotoList from "../../components/PhotoList/PhotoList";

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

  const castUrl = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${showId}/season/${season_number}/episode/${episode_number}/credits?api_key=${
    import.meta.env.VITE_API_KEY
  }`;
  const imagesUrl = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${showId}/season/${season_number}/episode/${episode_number}/images?api_key=${
    import.meta.env.VITE_API_KEY
  }`;
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
    <main className="page">
      <div className="page__content-wrapper">
        {castError && (
          <div className="loading-error" role="alert">
            {castError}
          </div>
        )}
        {(loadingCast || loadingImages) && (
          <div
            className="loader"
            aria-live="polite"
            aria-atomic="true"
            role="status"
            aria-label="Loading cast and photos"
          >
            <Loader aria-hidden="true" aria-busy="true" />
          </div>
        )}
        <h1 className="page__title">{name}</h1>
        <img
          alt={`${name} still image`}
          src={getUrlImages("big", still_path)}
          width="100%"
        />
        <h2 className="episode_number">
          S{padNumber(season_number)}E{padNumber(episode_number)}
        </h2>
        <h3 className="episode_airdate">Air date: {air_date}</h3>
        <p className="episode_overview">{overview}</p>

        <section aria-labelledby="cast">
          <h2 id="cast">CAST</h2>
          <div className="cast_container">
            {actorData &&
              actorData.cast &&
              actorData.cast.map((actor) => (
                <PersonCard key={actor.id} person={actor} />
              ))}
          </div>
        </section>

        <section aria-labelledby="photos">
          <h2 id="photos">PHOTOS</h2>
          {imagesData && <PhotoList imagesData={imagesData.stills} />}
        </section>

        {/* <h3 className="page__h2">PHOTOS</h3>
        <div className="photos_container">
          {imagesData &&
            imagesData.stills &&
            imagesData.stills.map((photo) => (
              <a
                href={getUrlImages("big", photo.file_path)}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  key={photo.file_path}
                  alt={photo.file_path}
                  src={getUrlImages("thumb", photo.file_path)}
                />
              </a>
            ))}
        </div> */}
      </div>
    </main>
  );
}
