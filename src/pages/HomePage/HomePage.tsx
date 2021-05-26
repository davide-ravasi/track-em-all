import React, { useState } from "react";
import { Context } from "../../context/GlobalContext";
import ShowList from "../../components/ShowList/ShowList";
import { populars } from "../../mock/popular-tv-show";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const shows = populars.results;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("searching");

    // call the TMDB API and set the search results to the resulting data
    setSearchResults([]);
    // hide the default homepage contants after the user has submitted the search form
    setHideHomepageContents(true);
  };

  return (
    <Context.Provider
      value={{
        searchTerm,
        searchResults,
      }}
    >
      <div className="page">
        <div className="page__content-wrapper">
          <div className="page__search">
            <form
              action="submit"
              className="search__form"
              onSubmit={handleSubmit}
            >
              Search form here...
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          {!hideHomepageContents && (
            <>
              <ShowList title="popular shows" shows={shows} />
              <ShowList title="recommended shows" shows={shows} />
              <ShowList title="new shows" shows={shows} />
            </>
          )}
        </div>
      </div>
    </Context.Provider>
  );
}
