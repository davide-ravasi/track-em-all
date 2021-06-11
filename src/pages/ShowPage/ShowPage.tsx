import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useApiCall from "../../hooks/UseApiCall";
import { getUrlImages } from "../../utils";

import VoteBox from "../../components/VoteBox/VoteBox";
import Loader from "../../components/Loader/Loader";
import ShowSeasons from "../../components/ShowSeasons/ShowSeasons";
import ShowVideo from "../../components/ShowVideo/ShowVideo";

import { Show, ShowPageType } from "../../typescript/types";

import "./ShowPage.scss";

export default function ShowPage(props: ShowPageType) {
  const { id } = useParams<ShowPageType>();
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const [showData, setShowData] = useState<Show | null>();
  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    setShowData(response);
  }, [response, error, loading]);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {error && <div className="loading-error">{error}</div>}
        {loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
        {showData && (
          <div className="show">
            <div className="show__media-wrapper">
              <button type="button" className="show__card-add">
                <FontAwesomeIcon icon={faHeart} />
              </button>

              {showData.backdrop_path && (
                <img
                  alt={showData.name}
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
              <div className="show__title">
                {showData.name}
                <VoteBox vote={showData.vote_average} />
              </div>
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
          </div>
        )}

        {showData && (
          <ShowSeasons nmbrSeasons={showData.number_of_seasons} idShow={id} />
        )}

        {showData && <ShowVideo idShow={id} />}
      </div>
    </div>
  );
}
