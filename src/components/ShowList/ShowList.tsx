import React, { useState, useEffect } from "react";
import { Show, ShowListProps } from "../../typescript/types";
import useApiCall from "../../hooks/UseApiCall";

import "./ShowList.scss";

import ShowCard from "../ShowCard/ShowCard";
import { getApiUrl } from "../../utils";

export default function ShowList(props: ShowListProps) {
  const [shows, setShows] = useState<{ results: Show[] } | null>();
  const { title, category, urlParameter } = props;
  const url = getApiUrl(category, urlParameter);
  const cardAmount = 6;

  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    if (response) {
      setShows(response);
    }
  }, [response]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="shows">
      {shows && shows?.results.length && <h1>{title}</h1>}
      <div className="shows__list">
        {shows &&
          shows?.results.slice(0, cardAmount).map((show: Show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
    </div>
  );
}
