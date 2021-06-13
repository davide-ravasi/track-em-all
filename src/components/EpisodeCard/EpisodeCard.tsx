import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import VoteBox from "../VoteBox/VoteBox";

import { Episode } from "../../typescript/types";
import { getUrlImages } from "../../utils";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import firebase from "../../firebase/firebase";

import { useAuth } from "../../contexts/AuthContext";

import "./EpisodeCard.scss";

type EpisodeCardProps = {
  episode: Episode;
};

export default function EpisodeCard(props: EpisodeCardProps) {
  const { id, name, vote_average, still_path, episode_number, air_date } =
    props.episode;

  const [watched, setWatched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allwatched, setAllwatched] = useState([]);
  const { currentUser } = useAuth();
  const ref = firebase.firestore().collection("Episodes");

  const handleWatched = (watched: any) => {
    console.log("watched: " + allwatched);
    setLoading(true);
    //.doc() use if for some reason you want that firestore generates the id
    ref
      .doc()
      .set(watched)
      .then(() => {
        setAllwatched((prev) => [...prev]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleWasWatched = async (id: Number) => {
    if (currentUser) {
      await ref
        .where("user", "==", currentUser.uid)
        .where("id", "==", id)
        .limit(1)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            setWatched(true);
            setLoading(false);
          } else {
            setWatched(false);
            setLoading(false);
          }
        });
    }
  };

  const handleUnwatch = (id: Number) => {
    setLoading(true);
    if (currentUser) {
      ref
        .where("user", "==", currentUser.uid)
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
          setWatched(false);
          setLoading(false);
        });
    }
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    handleWasWatched(id);
  });

  return (
    <div className="list__box">
      <div className="list__box-image">
        <Link to={`/episode/${id}`}>
          <img alt={name} src={getUrlImages("thumb", still_path)} />
        </Link>
        {!currentUser || loading ? (
          <FontAwesomeIcon icon={faSquare} />
        ) : !watched ? (
          <FontAwesomeIcon
            icon={faSquare}
            onClick={() => {
              handleWatched({
                id,
                user: currentUser.uid,
              });
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCheckSquare}
            onClick={() => {
              handleUnwatch(id);
            }}
          />
        )}
      </div>
      <p className="list__box-name">{name}</p>
      <VoteBox vote={vote_average} />
      <p className="list__box-detail">Episode {episode_number}</p>
      <p className="list__box-detail">Air date: {air_date}</p>
    </div>
  );
}
