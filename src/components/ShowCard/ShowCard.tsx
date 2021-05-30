import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { getUrlImages } from "../../utils";

import VoteBox from "../VoteBox/VoteBox";

import { Show } from "../../typescript/types";

import "./ShowCard.scss";

type ShowProps = {
  show: Show;
};

export default function ShowCard(props: ShowProps) {
  const { id, name, vote_average, poster_path } = props.show;
  const addToWatching = () => {};

  return (
    <Link className="show__card" to={`/show/${id}`}>
      <div className="show__card-image">
        <button
          type="button"
          className="show__card-add"
          onClick={() => addToWatching()}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <img alt={name} src={getUrlImages("thumb", poster_path)} />
        <VoteBox vote={vote_average} />
      </div>
      <p className="show__card-name">{name}</p>
    </Link>
  );
}
