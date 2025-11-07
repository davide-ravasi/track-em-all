import React, { useState, useEffect } from "react";
import { Categories, Person, Sections, Show } from "../../typescript/types";
import useApiCall from "../../hooks/UseApiCall";

import "./ShowList.scss";

import ShowCard from "../ShowCard/ShowCard";
import { getApiUrl } from "../../utils";
import { en } from "../../trads/en";
import PersonCard from "../PersonCard/PersonCard";

/*
 * ShowList component
 * @param {ShowListProps} props
 * @returns {JSX.Element}
 * @constructor
 * @memberof ShowList
 * @example
 * <ShowList title="Your Favorite Shows" section="tv" category="favorites" cardAmount={24} />
 */

/*
  @todo - remove slice from map and add in the setState
  @todo - remove results near map and add it when fetching data
*/

export interface ShowListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  section: Sections;
  linkMore?: boolean;
  category: Categories;
  id?: string;
  cardAmount?: number;
}

interface ShowProps {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export default function ShowList({
  title,
  section,
  linkMore = true,
  category,
  id,
  cardAmount,
  ...props
}: ShowListProps) {
  const [shows, setShows] = useState<ShowProps | null>();
  const [pageNumber, setPageNumber] = useState(2);

  const url = getApiUrl(section, category, id, 1);

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
      const url = getApiUrl(section, category, id, pageNumber);
      const response = await fetch(url);
      const showsMore = await response.json();
      const actualPage = showsMore.page + 1;

      setPageNumber(actualPage);

      if (shows?.results) {
        setShows({
          ...shows,
          page: actualPage,
          results: [...shows.results, ...showsMore.results],
        });
      }
    } catch (error) {
      console.log(error);
    }

    // if (response) {
    //   setShows({ ...shows, results: [...shows.results, ...response.results] });
    // }
  };

  return (
    <section className="shows" {...props}>
      {shows && shows.results && shows?.results.length && (
        <h1>
          {title ? title : en.categories[category].title}{" "}
          {cardAmount && linkMore && (
            <a
              className="shows__show-more"
              href={`/list/${section}/${id ? id + "/" : ""}${category}`}
            >
              {"show more >"}
            </a>
          )}
        </h1>
      )}
      <div className="shows__list">
        {shows &&
          shows.results &&
          shows?.results
            .slice(0, cardAmount ?? undefined)
            .map((show: Show | Person) => {
              return section !== "person" ? (
                <ShowCard key={show.id.toString()} show={show as Show} />
              ) : (
                <PersonCard person={show as Person} />
              );
            })}
      </div>
      <div className="shows__show-more-elements">
        {!cardAmount && (
          <button type="button" onClick={(e) => handleAddCards(e)}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
