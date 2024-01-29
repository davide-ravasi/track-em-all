import React from "react";
import { Show } from "../../typescript/types";

import "./ShowFavoritesList.scss";

import ShowCard from "../ShowCard/ShowCard";

interface ShowFavoritesProps {
  favorites: Show[];
}

export default function ShowFavoriteList(props: ShowFavoritesProps) {
  const { favorites } = props;

  console.log(favorites);

  return (
    <div className="shows__list">
      {favorites.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}
