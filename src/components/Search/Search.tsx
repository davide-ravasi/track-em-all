import React from "react";
import { SearchProps } from "../../typescript/types";

import "./Search.scss";

import ShowCard from "../ShowCard/ShowCard";

export default function Search(props: SearchProps) {
  const { shows } = props;

  return (
    <section className="search">
      <h2 id="search-results">Search Results</h2>
      <div className="search__list" role="list">
        {shows.map((show) => {
          return <ShowCard key={show.id.toString()} show={show} />;
        })}
      </div>
    </section>
  );
}
