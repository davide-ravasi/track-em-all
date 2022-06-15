import React, { useState, useEffect } from "react";
import { Context } from "../../context/GlobalContext";
import { Show } from "../../typescript/types";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Categories } from "../../typescript/types";

import firebase from "../../firebase/firebase";

import { useAuth } from "../../contexts/AuthContext";

import "../../components/Search/Search.scss";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-lambda";

export default function HomePage() {
  const [textInput, setTextInput] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [recommendedId, setRecommendedId] = useState<number>();
  const [recommendedName, setRecommendedName] = useState<string>();
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { currentUser } = useAuth();
  const ref = firebase.firestore().collection("Favorites");

  const HELLO = gql`
    query Query {
      hello
    }
  `;

  const { loading, error, data } = useQuery(HELLO);

  console.log(loading, error, data);

  useEffect(() => {
    if (!recommendedId) {
      const fetchData = async () => {
        if (currentUser) {
          await ref
            .where("user", "==", currentUser.uid)
            .get()
            .then(function (querySnapshot) {
              if (querySnapshot.size > 0) {
                const random =
                  Math.floor(
                    Math.random() * (1 + (querySnapshot.size - 1) - 0)
                  ) + 0;
                const result = querySnapshot.docs[random].data();
                console.log(result);
                setRecommendedId(result.id);
                setRecommendedName(result.name);
              }
            });
        }
      };

      fetchData();
    }
  }, [
    recommendedId,
    currentUser,
    ref,
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
        } catch (error) {
          setSearchResults([]);
          setSearchTerm("");
        } finally {
          setHideHomepageContents(true);
        }
      }
    } catch (error) {
      setSearchError(error.toString());
    }
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
              <ShowList title="popular shows" category={Categories.Popular} />

              <ShowList title="top rated" category={Categories.TopRated} />

              {recommendedId && (
                <ShowList
                  title={`because you liked:  ${recommendedName}`}
                  category={Categories.Recommended}
                  urlParameter={recommendedId}
                />
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
