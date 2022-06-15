import React from "react";
import { Show } from "../../typescript/types";

import "./ShowFavoritesList.scss";

import ShowCard from "../ShowCard/ShowCard";

interface ShowFavoritesProps {
  title: string;
  shows: Show[];
}

export default function ShowFavoriteList(props: ShowFavoritesProps) {
  const { title, shows } = props;

  return (
    <div className="favorite">
      <h1>{title}</h1>
      <div className="favorite__list">
        {shows &&
          shows.map((show: Show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
    </div>
  );
}
