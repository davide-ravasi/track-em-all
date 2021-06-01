import React, { useState } from "react";
import { Context } from "../../context/GlobalContext";
import { Show } from "../../typescript/types";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/SearchBar/SearchBar";
import { populars } from "../../mock/popular-tv-show";

import '../../components/Search/Search.scss';

export default function HomePage() {
  const [textInput, setTextInput] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  // const [searchError, setSearchError] = useState('');

  const shows = populars.results;

  const api_key = process.env.REACT_APP_API_KEY

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    console.log("searching");

    // call the TMDB API and set the search results to the resulting data
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${textInput}&page=1&include_adult=false`;
      
    try {
      setSearchTerm(textInput)

      if(textInput){
        try {
          const res = await fetch(url);
          const data = await res.json();
          setSearchResults(data.results);
          console.log(data.results);
        } catch (error) {
            setSearchResults([]);
            setSearchTerm('')
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
        handleChange
      }}
    >
      <div className="page">
        <div className="page__content-wrapper">
          <SearchBar textInput={textInput}/>
          {!hideHomepageContents ? (
            <>
              <ShowList title="popular shows" shows={shows} />
              <ShowList title="recommended shows" shows={shows} />
              <ShowList title="new shows" shows={shows} />
            </>
          ): (
            <>
              <Search shows={searchResults} />
            </>
          )}
        </div>
      </div>
    </Context.Provider>
  );
}
