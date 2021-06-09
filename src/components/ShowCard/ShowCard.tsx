import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getUrlImages } from "../../utils";

import VoteBox from "../VoteBox/VoteBox";

import { Show } from "../../typescript/types";

import firebase from "../../firebase/firebase";

import { useAuth } from "../../contexts/AuthContext";

import "./ShowCard.scss";

type ShowProps = {
  show: Show;
};

export default function ShowCard(props: ShowProps) {
  const { id, name, vote_average, poster_path } = props.show;

  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  const addToWatching = () => {};

  const ref = firebase.firestore().collection("Favorites");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    handleWasFavorited(id);
  });

  const handleFavorite = (favorite: any) => {
    console.log("favorites: " + favorites);
    //.doc() use if for some reason you want that firestore generates the id
    ref
      .doc()
      .set(favorite)
      .then(() => {
        setFavorites((prev) => [...prev]);
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
            setLoading(false);
          } else {
            setFavorited(false);
            setLoading(false);
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

  return (
    <div className="show__card">
      <div className="show__card-image">
        <button
          type="button"
          className="show__card-add"
          onClick={() => addToWatching()}
        >
          {!currentUser || loading ? (
            <div></div>
          ) : !favorited ? (
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => {
                handleFavorite({
                  poster_path,
                  vote_average,
                  name,
                  id,
                  user: currentUser.uid,
                });
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                handleUnfavorite(id);
              }}
            />
          )}
        </button>
        <Link to={`/show/${id}`}>
          <img alt={name} src={getUrlImages("thumb", poster_path)} />
          <VoteBox vote={vote_average} />
        </Link>
      </div>
      <p className="show__card-name">{name}</p>
    </div>
  );
}
