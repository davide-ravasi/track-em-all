import React from "react";
import ShowList from "../../components/ShowList/ShowList";
import { populars } from "../../mock/popular-tv-show";

export default function HomePage() {
  const shows = populars.results;
  return (
    <div className="page">
      <div className="page__content-wrapper">
        <ShowList title="popular shows" shows={shows} />
      </div>
    </div>
  );
}
