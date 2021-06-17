import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useApiCall from "../../hooks/UseApiCall";
import { getUrlImages } from "../../utils";

import VoteBox from "../../components/VoteBox/VoteBox";
import Loader from "../../components/Loader/Loader";
import ShowSeasons from "../../components/ShowSeasons/ShowSeasons";
import ShowVideo from "../../components/ShowVideo/ShowVideo";
import { useAuth } from "../../contexts/AuthContext";

import { Show, ShowPageType } from "../../typescript/types";

import firebase from "../../firebase/firebase";

import "./ShowPage.scss";

export default function ShowPage(props: ShowPageType) {
  const { id } = useParams<ShowPageType>();
  const { currentUser } = useAuth();
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const ref = firebase.firestore().collection("Favorites");

  const [showData, setShowData] = useState<Show | null>();
  const { response, error, loading } = useApiCall(url);

  const [favorited, setFavorited] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (favorite: any) => {
    //.doc() use if for some reason you want that firestore generates the id
    ref
      .doc()
      .set(favorite)
      .then(() => {
        setFavorites((prev) => [...prev]);
        setFavorited(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleWasFavorited = async (id: Number) => {
    if (currentUser) {
      await ref
        .where("user", "==", currentUser.uid)
        .where("id", "==", id)
        .limit(1)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            setFavorited(true);
          } else {
            setFavorited(false);
          }
        });
    }
  };

  const handleUnfavorite = (id: Number) => {
    if (currentUser) {
      ref
        .where("user", "==", currentUser.uid)
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
          setFavorited(false);
        });
    }
  };

  useEffect(() => {
    setShowData(response);
    handleWasFavorited(parseInt(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {!currentUser || loading ? (
                  <div></div>
                ) : !favorited ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => {
                      handleFavorite({
                        poster_path: showData.poster_path,
                        vote_average: showData.vote_average,
                        name: showData.name,
                        id: parseInt(id),
                        user: currentUser.uid,
                      });
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      handleUnfavorite(parseInt(id));
                    }}
                  />
                )}
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
