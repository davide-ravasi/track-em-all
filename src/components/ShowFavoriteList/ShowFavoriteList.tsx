import React from "react";
import { ShowListProps } from "../../typescript/types";

import "../Search/Search.scss";

import ShowFavorite from "../ShowFavorite/ShowFavorite";
import ShowCard from "../ShowCard/ShowCard";

export default function ShowFavoriteList(props: ShowListProps) {
  const { title, shows } = props;
  //const cardAmount = 10;

  return (
    <div className="search">
      <h1>{title}</h1>
      <div className="search__list">
        {shows &&
          shows.map((show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
    </div>
  );
}
