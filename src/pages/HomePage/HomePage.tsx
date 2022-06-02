import React, { useState, useEffect } from "react";
import { Context } from "../../context/GlobalContext";
import { Show, ShowResponse } from "../../typescript/types";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/SearchBar/SearchBar";
import useApiCall from "../../hooks/UseApiCall";

import firebase from "../../firebase/firebase";

import { useAuth } from "../../contexts/AuthContext";

import "../../components/Search/Search.scss";
import { getApiUrl } from "../../utils";

export default function HomePage() {
  const [textInput, setTextInput] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [recommendedId, setRecommendedId] = useState(Number);
  const [recommendedName, setRecommendedName] = useState(String);
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { currentUser } = useAuth();
  const ref = firebase.firestore().collection("Favorites");

  const popularUrl = getApiUrl("popular");
  const latestUrl = getApiUrl("top_rated");
  const recommendedUrl = getApiUrl("recommendations", recommendedId);
  const latest2Url = getApiUrl("latest");

  console.log(latest2Url);

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
  const {
    response: recommendedResponse,
    error: recommendedError,
    loading: recommendedLoading,
  } = useApiCall(recommendedUrl);

  const [popularData, setPopularData] = useState<ShowResponse | null>();
  const [topData, setTopData] = useState<ShowResponse | null>();
  const [recommendedData, setRecommendedData] = useState<ShowResponse | null>();

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
                setRecommendedData(recommendedResponse);
              }
            });
        }
      };

      fetchData();
    }
    setPopularData(popularResponse);
    setTopData(topResponse);
    setRecommendedData(recommendedResponse);
  }, [
    recommendedId,
    currentUser,
    ref,
    popularResponse,
    topResponse,
    recommendedResponse,
    topError,
    popularError,
    recommendedError,
    topLoading,
    popularLoading,
    recommendedLoading,
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

    // hide the default homepage contants after the user has submitted the search form
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
              {recommendedData &&
                recommendedData.results &&
                recommendedData.results.length > 0 && (
                  <ShowList
                    title={`because you liked:  ${recommendedName}`}
                    shows={recommendedData.results}
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
