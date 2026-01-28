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
  showId: string;
};

export default function EpisodeCard(props: EpisodeCardProps) {
  const {
    id,
    name,
    vote_average,
    still_path,
    episode_number,
    air_date,
    season_number,
    overview,
  } = props.episode;

  const [watched, setWatched] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const ref = firebase.firestore().collection("Episodes");

  const handleWatched = (watched: any) => {
    setLoading(true);
    //.doc() use if for some reason you want that firestore generates the id
    ref
      .doc()
      .set(watched)
      .then(() => {
        setWatched(true);
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
    <article className="list__box">
      <section className="list__box-image">
        <Link
          title={`View details for ${name} Season ${season_number} Episode ${episode_number}`}
          to={{
            pathname: `/episode/${id}`,
            state: {
              season_number,
              episode_number,
              overview,
              air_date,
              still_path,
              name,
              showId: props.showId,
            },
          }}
        >
          <img 
            alt={`${name} Season ${season_number} Episode ${episode_number} episode poster`}
            src={getUrlImages("thumb", still_path)}
            width="100%"
          />
        </Link>
        {!currentUser || loading ? (
          <FontAwesomeIcon icon={faSquare} aria-hidden="true" />
        ) : !watched ? (
          <button type="button" className="list__box-watched" onClick={() => {
            handleWatched({
              id,
              user: currentUser.uid,
            });
          }}>
            <FontAwesomeIcon
              icon={faSquare}
              aria-hidden="true"
            />
            <span className="sr-only">Mark as watched</span>
          </button>
        ) : (
          <button type="button" className="list__box-watched" onClick={() => {
            handleUnwatch(id);
          }}>
            <FontAwesomeIcon
              icon={faCheckSquare}
              aria-hidden="true"
            />
            <span className="sr-only">Mark as unwatched</span>
          </button>
        )}
      </section>
      <section className="list__box-content">
        <h2 className="list__box-name">{name}</h2>
        <VoteBox vote={vote_average} />
        <p className="list__box-detail">Episode {episode_number}</p>
        <p className="list__box-detail">Air date: {air_date}</p>
    </section>
    </article>
  );
}
