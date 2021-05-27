import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useApiCall from "../../hooks/UseApiCall";

import VoteBox from "../../components/VoteBox/VoteBox";

import { Show, ShowPageType } from "../../typescript/types";

import "./ShowPage.scss";

export default function ShowPage(props: ShowPageType) {
  const { id } = useParams<ShowPageType>();
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const baseBigImgUrl = `${process.env.REACT_APP_BASE_IMG_URL}/${process.env.REACT_APP_BASE_BIG_IMG_WIDTH}`;

  const [showData, setShowData] = useState<Show | null>();
  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    setShowData(response);
  }, [response, error, loading]);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {error && <div className="loading-error">{error}</div>}
        {loading && <div className="loader">loading.....</div>}
        {showData && (
          <div className="show">
            <div className="show__media-wrapper">
              <button type="button" className="show__card-add">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <img
                alt={showData.name}
                src={`${baseBigImgUrl}${showData.backdrop_path}`}
              />
            </div>
            <div className="show__content-wrapper">
              <div className="show__language">
                <span>Languages: </span>
                {showData.languages &&
                  showData.languages.map((lang, i, arr) => {
                    return (
                      <span>
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
                      <span>
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
                      <span>
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
      </div>
    </div>
  );
}

// https://api.themoviedb.org/3/tv/87917?api_key=b61f13ab08388482df500390ef8de990&language=en-US
// id: 87917

// creare url per immagine
// esportare type interno
// creare hook per call api
// creare box episodi e seconda call
// vedere per video youtube
