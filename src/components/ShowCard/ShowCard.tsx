import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Show } from "../../typescript/types";

import firebase from "../../firebase/firebase";

import { useAuth } from "../../contexts/AuthContext";

import "./ShowCard.scss";

type ShowProps = {
  show: Show;
  id: Number;
};

export default function ShowCard(props: ShowProps) {
  const { name, vote_average, poster_path } = props.show;
  const id = props.id;
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  const addToWatching = () => {};
  const baseThumbUrl = process.env.REACT_APP_BASE_IMG_URL;
  const baseThumbW = process.env.REACT_APP_BASE_THUMB_WIDTH;

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
    await ref
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
  };

  const handleUnfavorite = (id: Number) => {
    ref
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
        setFavorited(false);
      });
  };

  return (
    <div className="show__card">
      <div className="show__card-image">
        <button
          type="button"
          className="show__card-add"
          onClick={() => addToWatching()}
        >
          {!loading && !favorited ? (
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
        <img alt={name} src={`${baseThumbUrl}/${baseThumbW}/${poster_path}`} />
        <span className="show__card-vote">{vote_average}</span>
      </div>
      <p className="show__card-name">{name}</p>
    </div>
  );
}
