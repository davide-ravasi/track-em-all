import React from "react";
import { Favorite, Show } from "../../typescript/types";

import "./ShowFavoritesList.scss";

import ShowCard from "../ShowCard/ShowCard";

interface ShowFavoritesProps {
  favorites: Show[] | Favorite[];
}

export default function ShowFavoriteList(props: ShowFavoritesProps) {
  const { favorites } = props;

  return (
    <div className="shows__list">
      {favorites.map((show) => {
        const key = "showId" in show ? show.showId : show.id;
        return <ShowCard key={key} show={show} />;
      })}
    </div>
  );
}
