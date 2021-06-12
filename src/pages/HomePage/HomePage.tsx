import React, { useState, useEffect } from "react";
import { Context } from "../../context/GlobalContext";
import { Show, ShowResponse } from "../../typescript/types";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/SearchBar/SearchBar";
import useApiCall from "../../hooks/UseApiCall";

import "../../components/Search/Search.scss";

export default function HomePage() {
  const [textInput, setTextInput] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const [searchError, setSearchError] = useState("");

  const popularUrl = `${process.env.REACT_APP_BASE_TVSHOW_URL}popular?api_key=${process.env.REACT_APP_API_KEY}`;
  const latestUrl = `${process.env.REACT_APP_BASE_TVSHOW_URL}top_rated?api_key=${process.env.REACT_APP_API_KEY}`;
  const {
    response: popularResponse,
    error: popularError,
    loading: popularLoading,
  } = useApiCall(popularUrl);
  const {
    response: topResponse,
    error: topError,
    loading: topLoading,
  } = useApiCall(latestUrl);
  const [popularData, setPopularData] = useState<ShowResponse | null>();
  const [topData, setTopData] = useState<ShowResponse | null>();

  console.log("popular shows: ", popularResponse);
  console.log("top shows: ", topResponse);

  useEffect(() => {
    setPopularData(popularResponse);
    setTopData(topResponse);
  }, [
    popularResponse,
    topResponse,
    topError,
    popularError,
    topLoading,
    popularLoading,
  ]);

  const api_key = process.env.REACT_APP_API_KEY;

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // call the TMDB API and set the search results to the resulting data
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${textInput}&page=1&include_adult=false`;

    try {
      setSearchTerm(textInput);

      if (textInput) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setSearchResults(data.results);
          console.log(data.results);
        } catch (error) {
          setSearchResults([]);
          setSearchTerm("");
        } finally {
          setHideHomepageContents(true);
        }
      } else {
        console.log("please enter tv shows name");
      }
    } catch (error) {
      setSearchError(error.toString());
    }

    // setSearchResults([]);
    // // hide the default homepage contants after the user has submitted the search form
    // setHideHomepageContents(true);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  return (
    <Context.Provider
      value={{
        searchTerm,
        searchResults,
        getSearchData,
        handleChange,
      }}
    >
      <div className="page">
        <div className="page__content-wrapper">
          <SearchBar textInput={textInput} />
          {!hideHomepageContents ? (
            <>
              {popularData && (
                <ShowList title="popular shows" shows={popularData?.results} />
              )}
              {topData && (
                <ShowList title="top rated" shows={topData.results} />
              )}
            </>
          ) : (
            <>
              <Search shows={searchResults} />
            </>
          )}
          {searchError && <div>{searchError}</div>}
        </div>
      </div>
    </Context.Provider>
  );
}
