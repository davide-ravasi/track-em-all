import React, { useState, useEffect } from "react";
import { Show, ShowListProps } from "../../typescript/types";
import useApiCall from "../../hooks/UseApiCall";

import "./ShowList.scss";

import ShowCard from "../ShowCard/ShowCard";
import { getApiUrl } from "../../utils";
import { en } from "../../trads/en";

/*
 * ShowList component
 * @param {ShowListProps} props
 * @returns {JSX.Element}
 * @constructor
 * @memberof ShowList
 * @example
 * <ShowList title="Your Favorite Shows" category="favorites" cardAmount={24} />
 */

/*
  @todo - remove slice from map and add in the setState
  @todo - remove results near map and add it when fetching data
*/

interface ShowProps {
  page: number, 
  results: Show[], 
  total_pages: number, 
  total_results: number
}

export default function ShowList(props: ShowListProps) {
  const [shows, setShows] = useState<ShowProps | null >();
  const [pageNumber, setPageNumber] = useState(2);
  const {
    title,
    category,
    urlParameter,
    cardAmount,
  } = props;

  const url = getApiUrl(category, urlParameter);

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

  const handleAddCards = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const url = getApiUrl(category, urlParameter, pageNumber);
      const response = await fetch(url);
      const showsMore = await response.json();
      console.log(showsMore);
      const actualPage = showsMore.page + 1;

      setPageNumber(actualPage);

      if(shows?.results) {
        setShows({ ...shows, page: actualPage ,  results: [...shows.results, ...showsMore.results] });
      }
      
    } catch (error) {
      console.log(error);
    }

    // if (response) {
    //   setShows({ ...shows, results: [...shows.results, ...response.results] });
    // }
  };

  return (
    <div className="shows">
      {shows && shows?.results.length && (
        <h1>
          {title ? title : en.categories[category].title}{" "}
          {cardAmount && (
            <a className="shows__show-more" href={`/list/${category}`}>
              {"show more >"}
            </a>
          )}
        </h1>
      )}
      <div className="shows__list">
        {shows &&
          shows?.results.slice(0, cardAmount ?? undefined).map((show: Show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
          })}
      </div>
      {/* todo  add paging */}
      <div className="shows__show-more-elements">
        {!cardAmount &&
          <button type="button" onClick={(e) => handleAddCards(e)}>
            Show more
          </button>
        }
      </div>
    </div>
  );
}
