import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useApiCall from "../../hooks/UseApiCall";
import { getUrlImages } from "../../utils";

import VoteBox from "../../components/VoteBox/VoteBox";
import Loader from "../../components/Loader/Loader";
import ShowSeasons from "../../components/ShowSeasons/ShowSeasons";
import ShowVideo from "../../components/ShowVideo/ShowVideo";

import {
  Favorite,
  RootState,
  Show,
  ShowPageType,
} from "../../typescript/types";

import "./ShowPage.scss";
import { useSelector } from "react-redux";
import { useFavorite } from "../../hooks/UseFavorite";

export default function ShowPage(props: ShowPageType) {
  const { id } = useParams<ShowPageType>();
  const { user } = useSelector((state: RootState) => state.auth);

  const url = `${import.meta.env.VITE_BASE_TVSHOW_URL}${id}?api_key=${
    import.meta.env.VITE_API_KEY
  }`;

  const [showData, setShowData] = useState<Show | null>();
  const { response, error, loading } = useApiCall(url);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const { addFavorite, removeFavorite } = useFavorite();

  let favorite: Favorite | undefined;

  if (user && user.favorites) {
    favorite = user.favorites.find((everyFavorite: Favorite) => {
      return everyFavorite.showId === id.toString();
    });
  }

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite({ showData, user, id, setLoadingFavorite });
  };

  const handleUnfavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    favoriteId: string
  ) => {
    e.preventDefault();
    removeFavorite({ user, favoriteId, setLoadingFavorite });
  };

  useEffect(() => {
    setShowData(response);
    //handleWasFavorited(parseInt(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error, loading]);

  return (
    <main className="page">
      <div className="page__content-wrapper">
        {error && <div className="loading-error" role="alert">{error}</div>}
        {loading && (
          <div className="loader" aria-live="polite" aria-atomic="true" role="status" aria-label="Loading show information">
            <Loader aria-hidden="true" aria-busy="true" />
          </div>
        )}
        {showData && (
          <section className="show">
            <div className="show__media-wrapper">
              <button
                type="button"
                className="show__card-add"
                aria-busy={loadingFavorite}
                onClick={(e) =>
                  favorite ? handleUnfavorite(e, id) : handleFavorite(e)
                }
              >
                {user && (
                  <>
                    {!loadingFavorite && (
                      <FontAwesomeIcon
                        icon={faHeart}
                        aria-hidden="true"
                        className={favorite ? "selected" : ""}
                      />
                    )}
                    {loadingFavorite && (
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        aria-hidden="true"
                        className={"fa-spin"}
                      />
                    )}
                    <span className="sr-only">
                      {favorite ? `Remove ${showData.name} from favorites` : `Add ${showData.name} to favorites`}
                    </span>
                  </>
                )}
              </button>

              {showData.backdrop_path && (
                <img
                  alt={`${showData.name} backdrop`}
                  src={getUrlImages("big", showData.backdrop_path)}
                />
              )}
            </div>
            <div className="show__content-wrapper">
              <div className="show__language">
                <span>Languages: </span>
                {showData.languages &&
                  showData.languages.map((lang, i, arr) => {
                    return (
                      <span key={`language-${i}`}>
                        {lang}
                        {arr.length - 1 !== i && " / "}
                      </span>
                    );
                  })}
              </div>
              <h1 className="show__title">
                {showData.name}
                <VoteBox vote={showData.vote_average} />
              </h1>
              <div className="show__genres">
                {showData.genres &&
                  showData.genres.map((genre, i, arr) => {
                    return (
                      <span key={`genre-${i}`}>
                        {genre.name}
                        {arr.length - 1 !== i && " / "}
                      </span>
                    );
                  })}
              </div>
              <div className="show__description">{showData.overview}</div>
              <div className="show__creators">
                <span>Created by: </span>
                {showData.created_by &&
                  showData.created_by.map((creator, i, arr) => {
                    return (
                      <span key={`creator-${i}`}>
                        {creator.name}
                        {arr.length - 1 !== i && ", "}
                      </span>
                    );
                  })}
              </div>
              <div className="show__details">
                <p>Number of seasons: {showData.number_of_seasons} </p>
                <p>Number of episodes: {showData.number_of_episodes}</p>
              </div>
            </div>
          </section>
        )}

        {showData && (
          <ShowSeasons nmbrSeasons={showData.number_of_seasons} idShow={id} />
        )}

        {showData && <ShowVideo idShow={id} showName={showData.name} />}
      </div>
    </main>
  );
}
