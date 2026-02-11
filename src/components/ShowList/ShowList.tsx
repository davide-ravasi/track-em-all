import React, { useState, useEffect } from "react";
import { Categories, Person, Sections, Show } from "../../typescript/types";
import useApiCall from "../../hooks/UseApiCall";

import "./ShowList.scss";

import ShowCard from "../ShowCard/ShowCard";
import { getApiUrl } from "../../utils";
import { en } from "../../trads/en";
import PersonCard from "../PersonCard/PersonCard";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";

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

export interface ShowListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
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

  //const { response, error, loading } = useApiCall(url);

  const { data, isLoading, error } = useQuery({
    queryKey: [category],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      setShows(data);
    }
  }, [data]);

  const handleAddCards = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
  };

  const sectionTitle = title ? title : en.categories[category].title;
  const sectionId = `section-${category}-${id || ""}`
    .replace(/\s+/g, "-")
    .toLowerCase();
  const hasResults = shows && shows.results && shows?.results.length;

  if (isLoading) {
    return (
      <div
        className="loader"
        aria-live="polite"
        aria-atomic="true"
        role="status"
        aria-label={`Loading ${sectionTitle}`}
      >
        <Loader aria-hidden="true" aria-busy="true" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading-error" role="alert">
        Failed to load {sectionTitle}. {error?.message}
      </div>
    );
  }

  return (
    <section className="shows" {...props}>
      <h1>
        {sectionTitle}{" "}
        {hasResults && cardAmount && linkMore && (
          <a
            className="shows__show-more"
            href={`/list/${section}/${id ? id + "/" : ""}${category}`}
          >
            {"show more >"}
          </a>
        )}
      </h1>
      {!hasResults && <p>No {sectionTitle.toLowerCase()} found.</p>}
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
        {hasResults && !cardAmount && (
          <button
            type="button"
            onClick={(e) => handleAddCards(e)}
            aria-label={`Load more ${sectionTitle.toLowerCase()}`}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
