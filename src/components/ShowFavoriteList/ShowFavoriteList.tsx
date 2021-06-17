import React from "react";
import { ShowListProps } from "../../typescript/types";

import "./ShowFavoritesList.scss";

import ShowCard from "../ShowCard/ShowCard";

export default function ShowFavoriteList(props: ShowListProps) {
  const { title, shows } = props;

  return (
    <div className="favorite">
      <h1>{title}</h1>
      <div className="favorite__list">
        {shows &&
          shows.map((show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
    </div>
  );
}
