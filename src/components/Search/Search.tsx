import React from "react";
import { SearchProps } from "../../typescript/types";

import "./Search.scss";

import ShowCard from "../ShowCard/ShowCard";

export default function Search(props: SearchProps) {
  const { shows } = props;


  return (
    <div className="search">
      <div className="search__list">
        {shows.map((show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
    </div>
  );
}
