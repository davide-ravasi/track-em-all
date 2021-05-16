import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Show } from "../../typescript/types";

import './ShowCard.scss';

type ShowProps = {
  show: Show
}

export default function ShowCard(props: ShowProps) {
  const { name, vote_average, poster_path } = props.show;

  const addToWatching = () => {
    console.log('added');
  };

  return (
    <div className="show__card">
      <div className="show__card-image">
        <button
          type="button"
          className="recipe__button-watching"
          onClick={() => addToWatching()}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <img src={`https://image.tmdb.org/t/p/w185/3kl2oI6fhAio35wtz0EkRA3M4Of.jpg`} />
        <span className="show__card-vote">{vote_average}</span>
      </div>
      <p className="show__card-name">{name}</p>
    </div>
  );
}
