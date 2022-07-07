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
import { getSearchUrl } from "../../utils";

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
  }, [recommendedId, currentUser, ref]);

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSearchTerm(textInput);

      if (textInput) {
        try {
          const res = await fetch(getSearchUrl(textInput));
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

  return (
    <Context.Provider
      value={{
        searchTerm,
        searchResults,
        getSearchData,
      }}
    >
      <div className="page">
        <div className="page__content-wrapper">
          <SearchBar textInput={textInput} setTextInput={setTextInput} />
          {!hideHomepageContents ? (
            <>
              <ShowList category={Categories.Popular} cardAmount={6} />

              <ShowList category={Categories.TopRated} cardAmount={6} />

              {/* {recommendedId && (
                <ShowList
                  title={`because you liked:  ${recommendedName}`}
                  category={Categories.Recommended}
                  urlParameter={recommendedId}
                  cardAmount={6}
                />
              )} */}
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
